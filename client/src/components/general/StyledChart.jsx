import React, { createContext, useContext, useId, useMemo } from 'react';
import { ResponsiveContainer, Tooltip, Legend } from 'recharts';
import classNames from 'classnames';

// Simple theme mapping
const THEMES = { light: "", dark: ".dark" };

const ChartContext = createContext(null);

function useChart() {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }
    return context;
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
    const uniqueId = useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-chart={chartId}
                ref={ref}
                className={classNames(
                    "w-100 h-100 d-flex justify-content-center",
                    className
                )}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <ResponsiveContainer width="100%" height="100%">
                    {children}
                </ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
});
ChartContainer.displayName = "ChartContainer";

const ChartStyle = ({ id, config }) => {
    const colorConfig = Object.entries(config).filter(
        ([, config]) => config.theme || config.color
    );

    if (!colorConfig.length) return null;

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
                                .map(([key, itemConfig]) => {
                                    const color = itemConfig.theme?.[theme] || itemConfig.color;
                                    return color ? `  --color-${key}: ${color};` : null;
                                })
                                .join("\n")}
}
`
                    )
                    .join("\n"),
            }}
        />
    );
};

const ChartTooltip = Tooltip;

const ChartTooltipContent = React.forwardRef(
    (
        {
            active,
            payload,
            className,
            indicator = "dot",
            hideLabel = false,
            hideIndicator = false,
            label,
            labelFormatter,
            formatter,
            color,
            nameKey,
            labelKey,
        },
        ref
    ) => {
        const { config } = useChart();

        const tooltipLabel = useMemo(() => {
            if (hideLabel || !payload?.length) {
                return null;
            }

            const [item] = payload;
            const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const value =
                !labelKey && typeof label === "string"
                    ? config[label]?.label || label
                    : itemConfig?.label;

            if (labelFormatter) {
                return (
                    <div className="fw-medium">
                        {labelFormatter(value, payload)}
                    </div>
                );
            }

            if (!value) return null;

            return <div className="fw-medium">{value}</div>;
        }, [label, labelFormatter, payload, hideLabel, config, labelKey]);

        if (!active || !payload?.length) {
            return null;
        }

        const nestLabel = payload.length === 1 && indicator !== "dot";

        return (
            <div
                ref={ref}
                className={classNames(
                    "bg-white border p-2 rounded shadow-sm fs-6",
                    className
                )}
                style={{ minWidth: '8rem' }}
            >
                {!nestLabel ? tooltipLabel : null}
                <div className="d-flex flex-column gap-1">
                    {payload.map((item, index) => {
                        const key = `${nameKey || item.name || item.dataKey || "value"}`;
                        const itemConfig = getPayloadConfigFromPayload(config, item, key);
                        const indicatorColor = color || item.payload.fill || item.color;

                        return (
                            <div
                                key={item.dataKey}
                                className={classNames(
                                    "d-flex align-items-center gap-2 w-100",
                                    indicator === "dot" && "align-items-center"
                                )}
                            >
                                {formatter && item?.value !== undefined && item.name ? (
                                    formatter(item.value, item.name, item, index, item.payload)
                                ) : (
                                    <>
                                        {itemConfig?.icon ? (
                                            <itemConfig.icon />
                                        ) : (
                                            !hideIndicator && (
                                                <div
                                                    className={classNames(
                                                        "flex-shrink-0 rounded-1",
                                                        {
                                                            "rounded-circle": indicator === "dot",
                                                        }
                                                    )}
                                                    style={{
                                                        width: indicator === "dot" ? '10px' : '4px',
                                                        height: indicator === "dot" ? '10px' : '10px',
                                                        backgroundColor: indicatorColor,
                                                        borderColor: indicatorColor
                                                    }}
                                                />
                                            )
                                        )}
                                        <div
                                            className={classNames(
                                                "d-flex flex-grow-1 justify-content-between align-items-center gap-3",
                                                nestLabel ? "align-items-end" : "align-items-center"
                                            )}
                                        >
                                            <div className="d-flex flex-column">
                                                {nestLabel ? tooltipLabel : null}
                                                <span className="text-muted small">
                                                    {itemConfig?.label || item.name}
                                                </span>
                                            </div>
                                            {item.value && (
                                                <span className="font-monospace fw-bold text-dark">
                                                    {item.value.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = Legend;

const ChartLegendContent = React.forwardRef(
    (
        { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
        ref
    ) => {
        const { config } = useChart();

        if (!payload?.length) {
            return null;
        }

        return (
            <div
                ref={ref}
                className={classNames(
                    "d-flex align-items-center justify-content-center gap-3",
                    verticalAlign === "top" ? "pb-3" : "pt-3",
                    className
                )}
            >
                {payload.map((item) => {
                    const key = `${nameKey || item.dataKey || "value"}`;
                    const itemConfig = getPayloadConfigFromPayload(config, item, key);

                    return (
                        <div
                            key={item.value}
                            className="d-flex align-items-center gap-2 small text-muted"
                        >
                            {itemConfig?.icon && !hideIcon ? (
                                <itemConfig.icon />
                            ) : (
                                <div
                                    className="flex-shrink-0 rounded-1"
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: item.color,
                                    }}
                                />
                            )}
                            {itemConfig?.label}
                        </div>
                    );
                })}
            </div>
        );
    }
);
ChartLegendContent.displayName = "ChartLegendContent";

// Helper
function getPayloadConfigFromPayload(config, payload, key) {
    if (typeof payload !== "object" || payload === null) {
        return undefined;
    }

    const payloadPayload =
        "payload" in payload &&
            typeof payload.payload === "object" &&
            payload.payload !== null
            ? payload.payload
            : undefined;

    let configLabelKey = key;

    if (
        key in payload &&
        typeof payload[key] === "string"
    ) {
        configLabelKey = payload[key];
    } else if (
        payloadPayload &&
        key in payloadPayload &&
        typeof payloadPayload[key] === "string"
    ) {
        configLabelKey = payloadPayload[key];
    }

    return configLabelKey in config
        ? config[configLabelKey]
        : config[key];
}

export {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
};
