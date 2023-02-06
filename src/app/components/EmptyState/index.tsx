import { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { COLORS } from '../../../styles/theme/colors'
import backgroundEmptyState from './images/background-empty-state.svg'

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  minHeight: '250px',
  color: COLORS.white,
  backgroundColor: COLORS.brandExtraDark,
  backgroundImage: `url("${backgroundEmptyState}")`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}))

type EmptyStateProps = {
  description: ReactNode
  title: string
}

export const EmptyState: FC<EmptyStateProps> = ({ description, title }) => (
  <StyledBox>
    <Typography component="span" sx={{ fontSize: '24px', fontWeight: 600 }}>
      {title}
    </Typography>
    <Typography component="span" sx={{ fontSize: '16px' }}>
      {description}
    </Typography>
  </StyledBox>
)
