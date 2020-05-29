import React, { CSSProperties, useState, useEffect } from 'react';
import { Card } from '../../../components';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Languages } from '../../../api/analytics';

import { HighChartsTheme_Dark } from '../../../components/HighChartsTheme';

interface LanguageUsageProps {
    loading: boolean,
    error: Error | null,
    languages: Languages | null,
}

const LanguageUsage = (props: LanguageUsageProps) => {
    const initialOptions = {
        ...HighChartsTheme_Dark,
        title : {
            text: "",
        },
        chart : {
            ...HighChartsTheme_Dark.chart,
            type : "pie",
        },
        tooltip: {
            ...HighChartsTheme_Dark.tooltip,
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },    
        plotOptions: {
            ...HighChartsTheme_Dark.plotOptions,
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    // enabled: false,
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                    distance: -50,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 1
                    }
                },
                showInLegend: true,
            }
        },    
        series: [
            {
                name: "점유율",
                colorByPoint: true,
                data: []
            }
        ]
    };
    const [chartOptions, setChartOptions] = useState(initialOptions);

    useEffect(() => {
        // effect
        if (props.languages && props.languages.data) {
            let data: any = [];
            props.languages.data.forEach(language => {
                data.push({
                    name: language._id.language_name,
                    y: language.rate_percentage,
                });
            });
            const options = { ...initialOptions };
            options.series[0].data = data;
            setChartOptions(options);
        }
        else {
            setChartOptions(initialOptions);
        }
        return () => {
            setChartOptions(initialOptions);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    return (<div style={styles.container}>
        <Card title="사용된 언어" desc="정원사분들이 사용하는 언어를 보여줍니다">
            {/* CARD BODY */}
            <div style={styles.wrapper}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        </Card>
    </div>);
}

const styles: { [name: string]: CSSProperties } = {
    container: {
        height: "100%",
    },
    wrapper: {
        marginTop: '2em',
    }
}

export default LanguageUsage;