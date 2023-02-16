import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import { forwardRef, ForwardRefRenderFunction, memo } from 'react'
import { GraphEndpoint, GraphEndpoints } from './types'
import { useNavigate } from 'react-router-dom'
import { RouteUtils } from '../../../../utils/route-utils'
import { ParaTime } from '../../../../../config'

interface GraphBaseProps {
  disabled?: boolean
  transparent?: boolean
}

interface GraphProps extends GraphBaseProps {
  // TODO: Consider moving this to a state management solution
  selectedGraphEndpoint?: GraphEndpoint
  setSelectedGraphEndpoint: (value: GraphEndpoint) => void
}

interface GraphSvgProps extends GraphBaseProps {
  graphEndpoint?: GraphEndpoint
}

const GraphStyled = styled('svg', {
  shouldForwardProp: prop =>
    !(['disabled', 'transparent', 'graphEndpoint'] as (keyof GraphSvgProps)[]).includes(
      prop as keyof GraphSvgProps,
    ),
})<GraphSvgProps>(({ disabled, transparent, graphEndpoint }) => ({
  position: 'absolute',
  inset: 0,
  ...(disabled || transparent
    ? {
        pointerEvents: 'none',
      }
    : {}),
  ...(transparent
    ? {
        opacity: 0.25,
      }
    : {
        'g[id], circle[id]': {
          opacity: 0.9,
        },
      }),
  [`g[id^=${graphEndpoint}], circle[id^=${graphEndpoint}]`]: {
    opacity: '1',
  },
  [`ellipse[id=${GraphEndpoints.Consensus}-outer-circle]`]: {
    opacity: '0.25',
    '&:hover': {
      opacity: '0.25',
    },
  },
  '[id]': {
    cursor: 'pointer',
    '&:hover': {
      opacity: '1',
    },
  },
}))

const GraphCmp: ForwardRefRenderFunction<SVGSVGElement, GraphProps> = (
  { disabled = false, transparent = false, selectedGraphEndpoint, setSelectedGraphEndpoint },
  ref,
) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onSelectGraphEndpoint = (graphEndpoint: GraphEndpoint) => {
    if (
      selectedGraphEndpoint === graphEndpoint &&
      RouteUtils.getEnabledParaTimes().includes(selectedGraphEndpoint as unknown as ParaTime)
    ) {
      navigate(`/${graphEndpoint}`)

      return
    }

    setSelectedGraphEndpoint(graphEndpoint)
  }

  return (
    <GraphStyled
      width="100%"
      height="100%"
      viewBox="0 0 396 326"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      disabled={disabled}
      transparent={transparent}
      graphEndpoint={selectedGraphEndpoint}
      preserveAspectRatio="xMidYMid slice"
      ref={ref}
    >
      <path d="M196.527 63.9798L156.802 38.2004" stroke="url(#linearGradient1)" strokeWidth="0.845226" />
      <path d="M196.527 63.98L236.253 35.4536" stroke="url(#linearGradient2)" strokeWidth="0.845226" />
      <path d="M189.765 173.437L306.406 128.006" stroke="#00FEFF" strokeWidth="1.26784" />
      <path d="M188.075 174.493L196.738 65.0365" stroke="#00FEFF" strokeWidth="1.26784" />
      <path d="M189.066 171.769L132.429 247.044" stroke="#00FEFF" strokeWidth="1.26784" />
      <ellipse
        id={`${GraphEndpoints.Consensus}-outer-circle`}
        onClick={() => onSelectGraphEndpoint(GraphEndpoints.Consensus)}
        cx="189.733"
        cy="171.311"
        rx="52.9926"
        ry="52.9926"
        transform="rotate(-90 189.733 171.311)"
        fill="#00FEFF"
      />
      <circle
        id={`${GraphEndpoints.Consensus}-inner-circle`}
        onClick={() => onSelectGraphEndpoint(GraphEndpoints.Consensus)}
        cx="189.733"
        cy="171.311"
        r="37.3907"
        transform="rotate(-90 189.733 171.311)"
        fill="#00FEFF"
      />
      <circle
        id={`${GraphEndpoints.Consensus}-circle`}
        onClick={() => onSelectGraphEndpoint(GraphEndpoints.Consensus)}
        cx="189.932"
        cy="171.311"
        r="25.5236"
        transform="rotate(-90 189.932 171.311)"
        fill="#06152B"
      />
      <path
        id={`${GraphEndpoints.Consensus}-label`}
        onClick={() => onSelectGraphEndpoint(GraphEndpoints.Consensus)}
        d="M174.133 174.111C173.322 174.111 172.629 173.825 172.053 173.255C171.482 172.679 171.197 171.985 171.197 171.175C171.197 170.364 171.482 169.673 172.053 169.103C172.629 168.527 173.322 168.239 174.133 168.239C174.714 168.239 175.24 168.38 175.709 168.663C176.178 168.945 176.538 169.321 176.789 169.791L175.669 170.399C175.328 169.78 174.816 169.471 174.133 169.471C173.674 169.471 173.282 169.639 172.957 169.975C172.637 170.311 172.477 170.711 172.477 171.175C172.477 171.639 172.637 172.039 172.957 172.375C173.282 172.711 173.674 172.879 174.133 172.879C174.816 172.879 175.328 172.569 175.669 171.951L176.789 172.559C176.538 173.028 176.178 173.404 175.709 173.687C175.24 173.969 174.714 174.111 174.133 174.111ZM180.773 173.503C180.362 173.903 179.866 174.103 179.285 174.103C178.703 174.103 178.207 173.903 177.797 173.503C177.386 173.097 177.181 172.601 177.181 172.015C177.181 171.428 177.386 170.935 177.797 170.535C178.207 170.129 178.703 169.927 179.285 169.927C179.866 169.927 180.362 170.129 180.773 170.535C181.183 170.935 181.389 171.428 181.389 172.015C181.389 172.601 181.183 173.097 180.773 173.503ZM178.645 172.711C178.815 172.887 179.029 172.975 179.285 172.975C179.541 172.975 179.751 172.887 179.917 172.711C180.087 172.535 180.173 172.303 180.173 172.015C180.173 171.727 180.087 171.495 179.917 171.319C179.751 171.143 179.541 171.055 179.285 171.055C179.029 171.055 178.815 171.143 178.645 171.319C178.479 171.495 178.397 171.727 178.397 172.015C178.397 172.303 178.479 172.535 178.645 172.711ZM182.132 174.015V170.015H183.34V170.423C183.569 170.092 183.94 169.927 184.452 169.927C184.937 169.927 185.316 170.089 185.588 170.415C185.865 170.74 186.004 171.169 186.004 171.703V174.015H184.796V171.911C184.796 171.319 184.58 171.023 184.148 171.023C183.908 171.023 183.713 171.111 183.564 171.287C183.414 171.463 183.34 171.724 183.34 172.071V174.015H182.132ZM188.32 174.103C187.579 174.103 187.024 173.863 186.656 173.383L187.456 172.655C187.648 172.932 187.936 173.071 188.32 173.071C188.566 173.071 188.688 172.996 188.688 172.847C188.688 172.777 188.656 172.721 188.592 172.679C188.528 172.631 188.398 172.583 188.2 172.535L187.936 172.471C187.558 172.38 187.27 172.22 187.072 171.991C186.88 171.761 186.79 171.484 186.8 171.159C186.811 170.791 186.958 170.495 187.24 170.271C187.528 170.041 187.894 169.927 188.336 169.927C188.955 169.927 189.424 170.148 189.744 170.591L188.96 171.239C188.79 171.025 188.579 170.919 188.328 170.919C188.11 170.919 188 170.988 188 171.127C188 171.255 188.112 171.351 188.336 171.415L188.704 171.511C189.088 171.612 189.379 171.764 189.576 171.967C189.779 172.164 189.88 172.433 189.88 172.775C189.88 173.153 189.728 173.471 189.424 173.727C189.126 173.977 188.758 174.103 188.32 174.103ZM192.52 174.103C191.917 174.103 191.41 173.913 191 173.535C190.594 173.151 190.392 172.644 190.392 172.015C190.392 171.417 190.592 170.921 190.992 170.527C191.392 170.127 191.893 169.927 192.496 169.927C193.056 169.927 193.528 170.097 193.912 170.439C194.296 170.78 194.488 171.26 194.488 171.879C194.488 172.033 194.48 172.175 194.464 172.303H191.56C191.592 172.532 191.701 172.708 191.888 172.831C192.074 172.948 192.29 173.007 192.536 173.007C192.754 173.007 192.949 172.964 193.12 172.879C193.29 172.788 193.418 172.679 193.504 172.551L194.4 173.223C194.208 173.495 193.949 173.711 193.624 173.871C193.298 174.025 192.93 174.103 192.52 174.103ZM191.592 171.511H193.288C193.24 171.313 193.138 171.164 192.984 171.063C192.829 170.961 192.656 170.911 192.464 170.911C192.261 170.911 192.077 170.961 191.912 171.063C191.746 171.159 191.64 171.308 191.592 171.511ZM195.249 174.015V170.015H196.457V170.423C196.686 170.092 197.057 169.927 197.569 169.927C198.054 169.927 198.433 170.089 198.705 170.415C198.982 170.74 199.121 171.169 199.121 171.703V174.015H197.913V171.911C197.913 171.319 197.697 171.023 197.265 171.023C197.025 171.023 196.83 171.111 196.681 171.287C196.532 171.463 196.457 171.724 196.457 172.071V174.015H195.249ZM201.437 174.103C200.696 174.103 200.141 173.863 199.773 173.383L200.573 172.655C200.765 172.932 201.053 173.071 201.437 173.071C201.683 173.071 201.805 172.996 201.805 172.847C201.805 172.777 201.773 172.721 201.709 172.679C201.645 172.631 201.515 172.583 201.317 172.535L201.053 172.471C200.675 172.38 200.387 172.22 200.189 171.991C199.997 171.761 199.907 171.484 199.917 171.159C199.928 170.791 200.075 170.495 200.357 170.271C200.645 170.041 201.011 169.927 201.453 169.927C202.072 169.927 202.541 170.148 202.861 170.591L202.077 171.239C201.907 171.025 201.696 170.919 201.445 170.919C201.227 170.919 201.117 170.988 201.117 171.127C201.117 171.255 201.229 171.351 201.453 171.415L201.821 171.511C202.205 171.612 202.496 171.764 202.693 171.967C202.896 172.164 202.997 172.433 202.997 172.775C202.997 173.153 202.845 173.471 202.541 173.727C202.243 173.977 201.875 174.103 201.437 174.103ZM205.213 174.103C204.728 174.103 204.354 173.94 204.093 173.615C203.832 173.289 203.701 172.849 203.701 172.295V170.015H204.909V172.087C204.909 172.7 205.114 173.007 205.525 173.007C206.026 173.007 206.277 172.657 206.277 171.959V170.015H207.485V174.015H206.277V173.607C206.048 173.937 205.693 174.103 205.213 174.103ZM209.851 174.103C209.11 174.103 208.555 173.863 208.187 173.383L208.987 172.655C209.179 172.932 209.467 173.071 209.851 173.071C210.097 173.071 210.219 172.996 210.219 172.847C210.219 172.777 210.187 172.721 210.123 172.679C210.059 172.631 209.929 172.583 209.731 172.535L209.467 172.471C209.089 172.38 208.801 172.22 208.603 171.991C208.411 171.761 208.321 171.484 208.331 171.159C208.342 170.791 208.489 170.495 208.771 170.271C209.059 170.041 209.425 169.927 209.867 169.927C210.486 169.927 210.955 170.148 211.275 170.591L210.491 171.239C210.321 171.025 210.11 170.919 209.859 170.919C209.641 170.919 209.531 170.988 209.531 171.127C209.531 171.255 209.643 171.351 209.867 171.415L210.235 171.511C210.619 171.612 210.91 171.764 211.107 171.967C211.31 172.164 211.411 172.433 211.411 172.775C211.411 173.153 211.259 173.471 210.955 173.727C210.657 173.977 210.289 174.103 209.851 174.103Z"
        fill="white"
      />
      <g style={{ pointerEvents: selectedGraphEndpoint === GraphEndpoints.Emerald ? 'auto' : 'none' }}>
        <Link to={RouteUtils.getLatestTransactionsRoute(ParaTime.Emerald)}>
          <circle
            cx="235.407"
            cy="36.3673"
            r="11.8332"
            transform="rotate(-90 235.407 36.3673)"
            fill="#01F1E3"
          />
          <circle
            cx="235.335"
            cy="36.4385"
            r="8.02878"
            transform="rotate(-90 235.335 36.4385)"
            fill="#06152B"
          />
          <text x="232" y="38" fill="#fff" fontSize="4px">
            {t('home.txn')}
          </text>
        </Link>
        <Link to={RouteUtils.getLatestBlocksRoute(ParaTime.Emerald)}>
          <circle
            cx="156.801"
            cy="37.6351"
            r="11.8332"
            transform="rotate(-90 156.801 37.6351)"
            fill="#01F1E3"
          />
          <circle
            cx="156.729"
            cy="37.7066"
            r="8.02878"
            transform="rotate(-90 156.729 37.7066)"
            fill="#06152B"
          />
          <text x="151" y="39" fill="#fff" fontSize="4px">
            {t('home.blocks')}
          </text>
        </Link>
      </g>
      <path
        d="M258.802 179.838C259.956 170.718 259.302 161.46 256.878 152.593C254.454 143.725 250.307 135.422 244.674 128.157C239.041 120.892 232.032 114.808 224.048 110.252C216.064 105.696 207.26 102.757 198.14 101.603C189.02 100.449 179.762 101.103 170.894 103.527C162.027 105.951 153.724 110.098 146.459 115.731C139.194 121.364 133.11 128.373 128.554 136.357C123.998 144.342 121.059 153.145 119.905 162.265C118.751 171.385 119.405 180.643 121.829 189.511C124.253 198.378 128.4 206.681 134.033 213.946C139.666 221.211 146.675 227.295 154.659 231.851C162.643 236.407 171.447 239.346 180.567 240.5C189.687 241.654 198.945 241 207.813 238.576C216.68 236.152 224.983 232.005 232.248 226.372C239.513 220.739 245.597 213.731 250.153 205.746C254.709 197.762 257.648 188.958 258.802 179.838L258.802 179.838Z"
        stroke="#00FEFF"
        strokeWidth="6.16169"
        strokeDasharray="0.27 2.71"
      />
      <g
        filter="url(#filter0)"
        id={`${GraphEndpoints.Emerald}-circle`}
        onClick={() => onSelectGraphEndpoint(GraphEndpoints.Emerald)}
      >
        <circle cx="196.527" cy="63.5573" r="21.1306" fill="#000062" />
      </g>
      <path
        id={`${GraphEndpoints.Emerald}-label`}
        onClick={() => onSelectGraphEndpoint(GraphEndpoints.Emerald)}
        d="M180.984 65.5134V59.8334H184.296V60.5374H181.728V62.2574H183.816V62.9614H181.728V64.8094H184.296V65.5134H180.984ZM190.586 65.5134V63.1614C190.586 62.8308 190.516 62.5668 190.378 62.3694C190.244 62.1668 190.05 62.0654 189.794 62.0654C189.474 62.0654 189.212 62.1908 189.01 62.4414C188.812 62.6921 188.708 63.0334 188.698 63.4654V65.5134H188.01V63.1614C188.01 62.8254 187.94 62.5588 187.802 62.3614C187.668 62.1641 187.476 62.0654 187.226 62.0654C186.895 62.0654 186.628 62.1988 186.426 62.4654C186.223 62.7268 186.122 63.0814 186.122 63.5294V65.5134H185.434V61.5134H186.122V62.1294C186.378 61.6654 186.78 61.4334 187.33 61.4334C187.938 61.4334 188.348 61.7188 188.562 62.2894C188.668 62.0281 188.839 61.8201 189.074 61.6654C189.308 61.5108 189.575 61.4334 189.874 61.4334C190.306 61.4334 190.647 61.5801 190.898 61.8734C191.148 62.1668 191.274 62.5614 191.274 63.0574V65.5134H190.586ZM194.458 65.5934C193.844 65.5934 193.346 65.3961 192.962 65.0014C192.578 64.6068 192.386 64.1108 192.386 63.5134C192.386 62.9214 192.58 62.4281 192.97 62.0334C193.359 61.6334 193.858 61.4334 194.466 61.4334C195.004 61.4334 195.455 61.6148 195.818 61.9774C196.186 62.3348 196.37 62.8228 196.37 63.4414C196.37 63.5214 196.367 63.5908 196.362 63.6494H193.082C193.092 64.0228 193.226 64.3348 193.482 64.5854C193.743 64.8361 194.071 64.9614 194.466 64.9614C195.026 64.9614 195.442 64.7294 195.714 64.2654L196.258 64.6414C195.868 65.2761 195.268 65.5934 194.458 65.5934ZM193.13 63.0894H195.666C195.612 62.7694 195.471 62.5161 195.242 62.3294C195.018 62.1374 194.751 62.0414 194.442 62.0414C194.127 62.0414 193.844 62.1374 193.594 62.3294C193.348 62.5161 193.194 62.7694 193.13 63.0894ZM197.532 65.5134V61.5134H198.22V62.2894C198.295 62.0441 198.439 61.8468 198.652 61.6974C198.871 61.5481 199.1 61.4734 199.34 61.4734C199.457 61.4734 199.561 61.4841 199.652 61.5054V62.2174C199.556 62.1748 199.431 62.1534 199.276 62.1534C198.999 62.1534 198.753 62.2734 198.54 62.5134C198.327 62.7534 198.22 63.0921 198.22 63.5294V65.5134H197.532ZM202.163 65.5934C201.608 65.5934 201.142 65.3908 200.763 64.9854C200.39 64.5801 200.203 64.0894 200.203 63.5134C200.203 62.9374 200.39 62.4468 200.763 62.0414C201.142 61.6361 201.608 61.4334 202.163 61.4334C202.456 61.4334 202.728 61.5001 202.979 61.6334C203.235 61.7614 203.432 61.9268 203.571 62.1294V61.5134H204.259V65.5134H203.571V64.8974C203.432 65.1001 203.235 65.2681 202.979 65.4014C202.728 65.5294 202.456 65.5934 202.163 65.5934ZM202.267 64.9614C202.662 64.9614 202.987 64.8228 203.243 64.5454C203.499 64.2681 203.627 63.9241 203.627 63.5134C203.627 63.1028 203.499 62.7588 203.243 62.4814C202.987 62.2041 202.662 62.0654 202.267 62.0654C201.867 62.0654 201.539 62.2041 201.283 62.4814C201.027 62.7588 200.899 63.1028 200.899 63.5134C200.899 63.9241 201.027 64.2681 201.283 64.5454C201.539 64.8228 201.867 64.9614 202.267 64.9614ZM205.74 65.5134V59.5134H206.428V65.5134H205.74ZM209.566 65.5934C209.011 65.5934 208.545 65.3908 208.166 64.9854C207.793 64.5801 207.606 64.0894 207.606 63.5134C207.606 62.9374 207.793 62.4468 208.166 62.0414C208.545 61.6361 209.011 61.4334 209.566 61.4334C209.859 61.4334 210.131 61.5001 210.382 61.6334C210.638 61.7614 210.835 61.9268 210.974 62.1294V59.5134H211.662V65.5134H210.974V64.8974C210.835 65.1001 210.638 65.2681 210.382 65.4014C210.131 65.5294 209.859 65.5934 209.566 65.5934ZM209.67 64.9614C210.065 64.9614 210.39 64.8228 210.646 64.5454C210.902 64.2681 211.03 63.9241 211.03 63.5134C211.03 63.1028 210.902 62.7588 210.646 62.4814C210.39 62.2041 210.065 62.0654 209.67 62.0654C209.27 62.0654 208.942 62.2041 208.686 62.4814C208.43 62.7588 208.302 63.1028 208.302 63.5134C208.302 63.9241 208.43 64.2681 208.686 64.5454C208.942 64.8228 209.27 64.9614 209.67 64.9614Z"
        fill="white"
      />
      <g
        filter="url(#filter1)"
        id={`${GraphEndpoints.Cipher}-circle`}
        onClick={() => onSelectGraphEndpoint(GraphEndpoints.Cipher)}
      >
        <circle cx="305.984" cy="127.372" r="21.1306" fill="#000062" />
      </g>
      <path
        id={`${GraphEndpoints.Cipher}-label`}
        onClick={() => onSelectGraphEndpoint(GraphEndpoints.Cipher)}
        d="M297.184 129.424C296.368 129.424 295.675 129.141 295.104 128.576C294.533 128.005 294.248 127.309 294.248 126.488C294.248 125.667 294.533 124.973 295.104 124.408C295.675 123.837 296.368 123.552 297.184 123.552C297.723 123.552 298.211 123.675 298.648 123.92C299.085 124.165 299.435 124.501 299.696 124.928L299.072 125.304C298.869 124.979 298.605 124.723 298.28 124.536C297.955 124.349 297.589 124.256 297.184 124.256C296.565 124.256 296.045 124.472 295.624 124.904C295.208 125.336 295 125.864 295 126.488C295 127.112 295.208 127.64 295.624 128.072C296.045 128.504 296.565 128.72 297.184 128.72C297.589 128.72 297.955 128.627 298.28 128.44C298.605 128.253 298.869 127.997 299.072 127.672L299.696 128.048C299.435 128.475 299.085 128.811 298.648 129.056C298.211 129.301 297.723 129.424 297.184 129.424ZM301.457 124.12C301.366 124.211 301.252 124.256 301.113 124.256C300.974 124.256 300.857 124.211 300.761 124.12C300.665 124.024 300.617 123.907 300.617 123.768C300.617 123.635 300.665 123.52 300.761 123.424C300.857 123.328 300.974 123.28 301.113 123.28C301.252 123.28 301.366 123.328 301.457 123.424C301.548 123.52 301.593 123.635 301.593 123.768C301.593 123.907 301.548 124.024 301.457 124.12ZM300.761 129.328V125.328H301.449V129.328H300.761ZM303.627 131H302.939V125.328H303.627V125.944C303.766 125.741 303.961 125.576 304.211 125.448C304.467 125.315 304.742 125.248 305.035 125.248C305.59 125.248 306.054 125.451 306.427 125.856C306.806 126.261 306.995 126.752 306.995 127.328C306.995 127.904 306.806 128.395 306.427 128.8C306.054 129.205 305.59 129.408 305.035 129.408C304.742 129.408 304.467 129.344 304.211 129.216C303.961 129.083 303.766 128.915 303.627 128.712V131ZM303.955 128.36C304.211 128.637 304.537 128.776 304.931 128.776C305.326 128.776 305.651 128.637 305.907 128.36C306.163 128.083 306.291 127.739 306.291 127.328C306.291 126.917 306.163 126.573 305.907 126.296C305.651 126.019 305.326 125.88 304.931 125.88C304.537 125.88 304.211 126.019 303.955 126.296C303.699 126.573 303.571 126.917 303.571 127.328C303.571 127.739 303.699 128.083 303.955 128.36ZM308.86 129.328H308.172V123.328H308.86V125.944C309.132 125.48 309.556 125.248 310.132 125.248C310.585 125.248 310.951 125.395 311.228 125.688C311.505 125.981 311.644 126.373 311.644 126.864V129.328H310.964V126.968C310.964 126.632 310.879 126.368 310.708 126.176C310.537 125.979 310.308 125.88 310.02 125.88C309.689 125.88 309.412 126.011 309.188 126.272C308.969 126.533 308.86 126.891 308.86 127.344V129.328ZM314.829 129.408C314.216 129.408 313.717 129.211 313.333 128.816C312.949 128.421 312.757 127.925 312.757 127.328C312.757 126.736 312.952 126.243 313.341 125.848C313.73 125.448 314.229 125.248 314.837 125.248C315.376 125.248 315.826 125.429 316.189 125.792C316.557 126.149 316.741 126.637 316.741 127.256C316.741 127.336 316.738 127.405 316.733 127.464H313.453C313.464 127.837 313.597 128.149 313.853 128.4C314.114 128.651 314.442 128.776 314.837 128.776C315.397 128.776 315.813 128.544 316.085 128.08L316.629 128.456C316.24 129.091 315.64 129.408 314.829 129.408ZM313.501 126.904H316.037C315.984 126.584 315.842 126.331 315.613 126.144C315.389 125.952 315.122 125.856 314.813 125.856C314.498 125.856 314.216 125.952 313.965 126.144C313.72 126.331 313.565 126.584 313.501 126.904ZM317.903 129.328V125.328H318.591V126.104C318.666 125.859 318.81 125.661 319.023 125.512C319.242 125.363 319.471 125.288 319.711 125.288C319.829 125.288 319.933 125.299 320.023 125.32V126.032C319.927 125.989 319.802 125.968 319.647 125.968C319.37 125.968 319.125 126.088 318.911 126.328C318.698 126.568 318.591 126.907 318.591 127.344V129.328H317.903Z"
        fill="white"
      />
      <g
        filter="url(#filter2)"
        id={`${GraphEndpoints.Sapphire}-circle`}
        onClick={() => onSelectGraphEndpoint(GraphEndpoints.Sapphire)}
      >
        <circle cx="124.683" cy="257.114" r="21.1306" fill="#000062" />
      </g>
      <path
        id={`${GraphEndpoints.Sapphire}-label`}
        onClick={() => onSelectGraphEndpoint(GraphEndpoints.Sapphire)}
        d="M109.592 259.166C109.139 259.166 108.731 259.07 108.368 258.878C108.011 258.686 107.755 258.441 107.6 258.142L108.2 257.694C108.536 258.211 109.005 258.47 109.608 258.47C109.912 258.47 110.163 258.395 110.36 258.246C110.557 258.091 110.656 257.883 110.656 257.622C110.656 257.185 110.384 256.865 109.84 256.662L109.088 256.374C108.64 256.209 108.312 256.003 108.104 255.758C107.901 255.507 107.8 255.19 107.8 254.806C107.8 254.347 107.965 253.982 108.296 253.71C108.632 253.433 109.059 253.294 109.576 253.294C109.923 253.294 110.24 253.366 110.528 253.51C110.816 253.649 111.051 253.835 111.232 254.07L110.688 254.55C110.373 254.177 109.997 253.99 109.56 253.99C109.272 253.99 109.029 254.065 108.832 254.214C108.635 254.358 108.536 254.545 108.536 254.774C108.536 255.003 108.603 255.185 108.736 255.318C108.869 255.451 109.088 255.574 109.392 255.686L110.08 255.95C110.517 256.115 110.845 256.329 111.064 256.59C111.288 256.851 111.4 257.185 111.4 257.59C111.4 258.065 111.229 258.446 110.888 258.734C110.552 259.022 110.12 259.166 109.592 259.166ZM114.224 259.15C113.669 259.15 113.202 258.947 112.824 258.542C112.45 258.137 112.264 257.646 112.264 257.07C112.264 256.494 112.45 256.003 112.824 255.598C113.202 255.193 113.669 254.99 114.224 254.99C114.517 254.99 114.789 255.057 115.04 255.19C115.296 255.318 115.493 255.483 115.632 255.686V255.07H116.32V259.07H115.632V258.454C115.493 258.657 115.296 258.825 115.04 258.958C114.789 259.086 114.517 259.15 114.224 259.15ZM114.328 258.518C114.722 258.518 115.048 258.379 115.304 258.102C115.56 257.825 115.688 257.481 115.688 257.07C115.688 256.659 115.56 256.315 115.304 256.038C115.048 255.761 114.722 255.622 114.328 255.622C113.928 255.622 113.6 255.761 113.344 256.038C113.088 256.315 112.96 256.659 112.96 257.07C112.96 257.481 113.088 257.825 113.344 258.102C113.6 258.379 113.928 258.518 114.328 258.518ZM118.489 260.742H117.801V255.07H118.489V255.686C118.627 255.483 118.822 255.318 119.073 255.19C119.329 255.057 119.603 254.99 119.897 254.99C120.451 254.99 120.915 255.193 121.289 255.598C121.667 256.003 121.857 256.494 121.857 257.07C121.857 257.646 121.667 258.137 121.289 258.542C120.915 258.947 120.451 259.15 119.897 259.15C119.603 259.15 119.329 259.086 119.073 258.958C118.822 258.825 118.627 258.657 118.489 258.454V260.742ZM118.817 258.102C119.073 258.379 119.398 258.518 119.793 258.518C120.187 258.518 120.513 258.379 120.769 258.102C121.025 257.825 121.153 257.481 121.153 257.07C121.153 256.659 121.025 256.315 120.769 256.038C120.513 255.761 120.187 255.622 119.793 255.622C119.398 255.622 119.073 255.761 118.817 256.038C118.561 256.315 118.433 256.659 118.433 257.07C118.433 257.481 118.561 257.825 118.817 258.102ZM123.722 260.742H123.034V255.07H123.722V255.686C123.86 255.483 124.055 255.318 124.306 255.19C124.562 255.057 124.836 254.99 125.13 254.99C125.684 254.99 126.148 255.193 126.522 255.598C126.9 256.003 127.09 256.494 127.09 257.07C127.09 257.646 126.9 258.137 126.522 258.542C126.148 258.947 125.684 259.15 125.13 259.15C124.836 259.15 124.562 259.086 124.306 258.958C124.055 258.825 123.86 258.657 123.722 258.454V260.742ZM124.05 258.102C124.306 258.379 124.631 258.518 125.026 258.518C125.42 258.518 125.746 258.379 126.002 258.102C126.258 257.825 126.386 257.481 126.386 257.07C126.386 256.659 126.258 256.315 126.002 256.038C125.746 255.761 125.42 255.622 125.026 255.622C124.631 255.622 124.306 255.761 124.05 256.038C123.794 256.315 123.666 256.659 123.666 257.07C123.666 257.481 123.794 257.825 124.05 258.102ZM128.954 259.07H128.266V253.07H128.954V255.686C129.226 255.222 129.65 254.99 130.226 254.99C130.68 254.99 131.045 255.137 131.322 255.43C131.6 255.723 131.738 256.115 131.738 256.606V259.07H131.058V256.71C131.058 256.374 130.973 256.11 130.802 255.918C130.632 255.721 130.402 255.622 130.114 255.622C129.784 255.622 129.506 255.753 129.282 256.014C129.064 256.275 128.954 256.633 128.954 257.086V259.07ZM133.859 253.862C133.769 253.953 133.654 253.998 133.515 253.998C133.377 253.998 133.259 253.953 133.163 253.862C133.067 253.766 133.019 253.649 133.019 253.51C133.019 253.377 133.067 253.262 133.163 253.166C133.259 253.07 133.377 253.022 133.515 253.022C133.654 253.022 133.769 253.07 133.859 253.166C133.95 253.262 133.995 253.377 133.995 253.51C133.995 253.649 133.95 253.766 133.859 253.862ZM133.163 259.07V255.07H133.851V259.07H133.163ZM135.341 259.07V255.07H136.029V255.846C136.104 255.601 136.248 255.403 136.461 255.254C136.68 255.105 136.909 255.03 137.149 255.03C137.267 255.03 137.371 255.041 137.461 255.062V255.774C137.365 255.731 137.24 255.71 137.085 255.71C136.808 255.71 136.563 255.83 136.349 256.07C136.136 256.31 136.029 256.649 136.029 257.086V259.07H135.341ZM140.076 259.15C139.463 259.15 138.964 258.953 138.58 258.558C138.196 258.163 138.004 257.667 138.004 257.07C138.004 256.478 138.199 255.985 138.588 255.59C138.978 255.19 139.476 254.99 140.084 254.99C140.623 254.99 141.074 255.171 141.436 255.534C141.804 255.891 141.988 256.379 141.988 256.998C141.988 257.078 141.986 257.147 141.98 257.206H138.7C138.711 257.579 138.844 257.891 139.1 258.142C139.362 258.393 139.69 258.518 140.084 258.518C140.644 258.518 141.06 258.286 141.332 257.822L141.876 258.198C141.487 258.833 140.887 259.15 140.076 259.15ZM138.748 256.646H141.284C141.231 256.326 141.09 256.073 140.86 255.886C140.636 255.694 140.37 255.598 140.06 255.598C139.746 255.598 139.463 255.694 139.212 255.886C138.967 256.073 138.812 256.326 138.748 256.646Z"
        fill="white"
      />

      <defs>
        <filter
          id="filter0"
          x="142.479"
          y="11.1546"
          width="108.097"
          height="108.097"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.6459" />
          <feGaussianBlur stdDeviation="16.459" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.135917 0 0 0 0 0 0 0 0 0 0.970833 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1369_48512" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1369_48512" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4.11475" dy="6.58359" />
          <feGaussianBlur stdDeviation="4.11475" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.996078 0 0 0 0 1 0 0 0 0.95 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1369_48512" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.822949" />
          <feGaussianBlur stdDeviation="2.05737" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0" />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_1369_48512"
            result="effect3_innerShadow_1369_48512"
          />
        </filter>
        <filter
          id="filter1"
          x="251.935"
          y="74.969"
          width="108.097"
          height="108.097"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.6459" />
          <feGaussianBlur stdDeviation="16.459" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.135917 0 0 0 0 0 0 0 0 0 0.970833 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1369_48512" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1369_48512" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4.11475" dy="6.58359" />
          <feGaussianBlur stdDeviation="4.11475" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.996078 0 0 0 0 1 0 0 0 0.95 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1369_48512" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.822949" />
          <feGaussianBlur stdDeviation="2.05737" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0" />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_1369_48512"
            result="effect3_innerShadow_1369_48512"
          />
        </filter>
        <filter
          id="filter2"
          x="70.6348"
          y="204.711"
          width="108.097"
          height="108.097"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.6459" />
          <feGaussianBlur stdDeviation="16.459" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.135917 0 0 0 0 0 0 0 0 0 0.970833 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1369_48512" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1369_48512" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4.11475" dy="6.58359" />
          <feGaussianBlur stdDeviation="4.11475" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.996078 0 0 0 0 1 0 0 0 0.95 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1369_48512" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.822949" />
          <feGaussianBlur stdDeviation="2.05737" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.58 0" />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_1369_48512"
            result="effect3_innerShadow_1369_48512"
          />
        </filter>
        <linearGradient
          id="linearGradient1"
          x1="165.043"
          y1="44.117"
          x2="181.736"
          y2="55.105"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#02EAE4" />
          <stop offset="1" stopColor="#2C3BD5" />
        </linearGradient>
        <linearGradient
          id="linearGradient2"
          x1="225.899"
          y1="40.9476"
          x2="207.304"
          y2="55.9503"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#02EAE4" />
          <stop offset="1" stopColor="#2C3BD5" />
        </linearGradient>
      </defs>
    </GraphStyled>
  )
}

export const Graph = memo(forwardRef(GraphCmp))
