import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useHref } from 'react-router-dom'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { ShowMoreTokensLink } from './ShowMoreTokensLink'
import { type Token } from '../../../oasis-indexer/api'

type TokenPillsProps = {
  tokens: Token[]
}

export const TokenPills: FC<TokenPillsProps> = ({ tokens }) => {
  const { t } = useTranslation()
  if (!tokens) {
    return <Typography sx={{ opacity: '0.5' }}>{t('account.noTokens')}</Typography>
  }
  const pills = tokens.slice(0, 3)

  return (
    <>
      {pills.map(item => (
        <Chip
          clickable
          color="tertiary"
          component={Link}
          href={`${item.token_type === 'ERC20' ? useHref('tokens/erc-20') : useHref('tokens/erc-721')}#${
            item.token_contract_addr
          }`}
          key={item.token_contract_addr}
          label={`${item.balance} ${item.token_name}`}
          sx={{ mr: 2 }}
          variant="outlined"
        />
      ))}

      <ShowMoreTokensLink tokens={tokens} pills={pills} />
    </>
  )
}
