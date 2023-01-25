import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ChartDuration, chartDurationToDaysMap } from '../../utils/chart-utils'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { LineChart } from '../../components/charts/LineChart'
import { SnapshotCard } from './SnapshotCard'
import { useGetRosePrice, useGetRoseMarketChart } from '../../../coin-gecko/api'

type RoseChartCardProps = {
  chartDuration: ChartDuration
}

const formatFiatRoseParams = {
  value: {
    currency: 'USD',
    maximumFractionDigits: 5,
  },
}

export const RoseChartCard: FC<RoseChartCardProps> = ({ chartDuration }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const rosePriceQuery = useGetRosePrice()
  const roseMarketChartQuery = useGetRoseMarketChart({
    days: chartDurationToDaysMap[chartDuration],
  })
  const lineChartData = roseMarketChartQuery.data?.map(item => ({
    timestamp: item[0],
    value: item[1],
  }))
  const percentage =
    lineChartData &&
    rosePriceQuery.data &&
    ((rosePriceQuery.data - lineChartData[0].value) / lineChartData[0].value) * 100

  return (
    <SnapshotCard
      label={
        rosePriceQuery.data
          ? t('common.fiatValueInUSD', {
              value: rosePriceQuery.data,
              formatParams: formatFiatRoseParams,
            })
          : ''
      }
      percentage={percentage}
      title={t('roseChart.header')}
    >
      <Box sx={{ minHeight: '70px' }}>
        {lineChartData && (
          <LineChart
            dataKey="value"
            data={lineChartData}
            margin={{ left: 0, right: isMobile ? 80 : 40, top: 15, bottom: 15 }}
            formatters={{
              data: (value: number) =>
                t('common.fiatValueInUSD', {
                  value,
                  formatParams: formatFiatRoseParams,
                }),
              label: (value: string) =>
                t('common.formattedDateTime', {
                  timestamp: new Date(value),
                  formatParams: {
                    timestamp: {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    },
                  },
                }),
            }}
          />
        )}
      </Box>
    </SnapshotCard>
  )
}
