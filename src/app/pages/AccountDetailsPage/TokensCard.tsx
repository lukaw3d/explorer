import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useLocation, useLoaderData } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { TokensEmptyState } from './TokensEmptyState'
import { Table, TableCellAlign } from '../../components/Table'
import { CopyToClipboard } from '../../components/CopyToClipboard'
import { NUMBER_OF_ITEMS_ON_SEPARATE_PAGE } from '../../config'
import { ParaTime } from '../../../config'
import { useGetConsensusAccountsAddress } from '../../../oasis-indexer/api'

type TokensCardProps = {
  type: 'ERC20' | 'ERC721'
}

export const TokensCard: FC<TokensCardProps> = ({ type }) => {
  const { t } = useTranslation()
  const address = useLoaderData() as string
  const locationHash = useLocation().hash.replace('#', '')
  const tokenLabel = t(`account.${type}`)
  const tokenListLabel = t('account.tokensListTitle', { token: tokenLabel })
  const tableColumns = [
    { content: t('common.name') },
    { content: t('common.smartContract') },
    { align: TableCellAlign.Right, content: t('common.balance') },
    { align: TableCellAlign.Right, content: t('common.ticker') },
  ]
  const accountQuery = useGetConsensusAccountsAddress(address!)
  const runtimeEvmBalance = accountQuery.data?.data.runtime_evm_balances?.filter(
    item => item.token_type === type && item.runtime === ParaTime.Emerald,
  )
  const tableRows = runtimeEvmBalance?.map(item => ({
    key: item.token_contract_addr,
    data: [
      {
        content: item.token_name,
        key: 'name',
      },
      {
        content: (
          <Box id={item.token_contract_addr}>
            <CopyToClipboard value={item.token_contract_addr} />
          </Box>
        ),
        key: 'hash',
      },
      {
        align: TableCellAlign.Right,
        content: item.balance,
        key: 'balance',
      },
      {
        align: TableCellAlign.Right,
        content: item.token_symbol,
        key: 'ticker',
      },
    ],
    highlight: item.token_contract_addr === locationHash,
  }))

  return (
    <Card>
      <CardHeader disableTypography component="h3" title={tokenListLabel} />
      <CardContent>
        {!accountQuery.isLoading && !runtimeEvmBalance?.length && <TokensEmptyState label={tokenLabel} />}
        <Table
          columns={tableColumns}
          rows={tableRows}
          rowsNumber={NUMBER_OF_ITEMS_ON_SEPARATE_PAGE}
          name={tokenListLabel}
          isLoading={accountQuery.isLoading}
          pagination={false}
        />
      </CardContent>
    </Card>
  )
}
