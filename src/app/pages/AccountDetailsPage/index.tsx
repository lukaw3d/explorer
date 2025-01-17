import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHref, useLoaderData } from 'react-router-dom'
import { PageLayout } from '../../components/PageLayout'
import { SubPageCard } from '../../components/SubPageCard'
import { Account } from '../../components/Account'
import { RouterTabs } from '../../components/RouterTabs'
import { useGetConsensusAccountsAddress } from '../../../oasis-indexer/api'
import { useGetRosePrice } from '../../../coin-gecko/api'

export const AccountDetailsPage: FC = () => {
  const { t } = useTranslation()
  const address = useLoaderData() as string
  // TODO: switch to Emerald when API is ready
  const accountQuery = useGetConsensusAccountsAddress(address!)
  const account = accountQuery.data?.data
  const rosePriceQuery = useGetRosePrice()

  return (
    <PageLayout>
      <SubPageCard featured title={t('account.title')}>
        <Account account={account} isLoading={accountQuery.isLoading} roseFiatValue={rosePriceQuery.data} />
      </SubPageCard>
      <RouterTabs
        tabs={[
          { label: t('common.transactions'), to: useHref('') },
          { label: t('account.ERC20'), to: useHref('tokens/erc-20') },
          { label: t('account.ERC721'), to: useHref('tokens/erc-721') },
        ]}
      />
    </PageLayout>
  )
}
