
export const Caret = ({ color = '#000', styles = '', width = "1em", height = "1em", strokeWidth = 1 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0  0 24 24"
        width={width}
        height={height}
        className={`${styles}`}
        stroke={color}
        strokeWidth={strokeWidth}
    >
        <path
            fill={color}
            fillRule="evenodd"
            d="M9.399 4.328a.75.75 0 0 1 1.06 0l6.364 6.363a1.75 1.75 0 0 1 0 2.475L10.46 19.53a.75.75 0 0 1-1.06-1.06l6.364-6.364a.25.25 0 0 0 0-.354L9.399 5.388a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
            strokeWidth={strokeWidth}
        />
    </svg>
)

export const DoubleCaret = ({ color = '#000', styles = '', width = "1em", height = "1em", strokeWidth = 1 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 16"
        width={width}
        height={height}
        className={`${styles}`}
        stroke={color}
        strokeWidth={strokeWidth}
    >
        <path
            fill={color}
            d="M8.55 2.24a.75.75 0 0 0-1.1 0L4.2 5.74a.75.75 0 1 0 1.1 1.02L8 3.852l2.7 2.908a.75.75 0 1 0 1.1-1.02l-3.25-3.5zm-1.1 11.52a.75.75 0 0 0 1.1 0l3.25-3.5a.75.75 0 1 0-1.1-1.02L8 12.148 5.3 9.24a.75.75 0 0 0-1.1 1.02l3.25 3.5z"
        />
    </svg>
)

export const Elipsis = ({ color = "#000", width = "2.5em", height = "2.5em", strokeWidth = 2 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={width}
        height={height}
    >
        <g
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
        >
            <path d="M12.005 16.005v-.01M12.005 12.005v-.01M12.005 8.005v-.01" />
        </g>
    </svg>
)

export const More = ({ color = "#000", width = "2.5em", height = "2.5em", strokeWidth = 2 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={width}
        height={height}
    >
        <g
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
        >
            <path d="M12.005 16.005v-.01M12.005 12.005v-.01M12.005 8.005v-.01" />
        </g>
    </svg>
)

export const EditIcon = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 20h16M4 20v-4l8-8M4 20h4l8-8m-4-4 2.869-2.869.001-.001c.395-.395.593-.593.821-.667a1 1 0 0 1 .618 0c.228.074.425.272.82.666l1.74 1.74c.396.396.594.594.668.822a1 1 0 0 1 0 .618c-.074.228-.272.426-.668.822h0L16 12.001m-4-4 4 4"
        />
    </svg>
)

export const DeleteIcon = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 5h12M9 5v0a3.951 3.951 0 0 1 6 0v0M9 20h6a2 2 0 0 0 2-2V9a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2Z"
        />
    </svg>
)


export const OverviewIcon = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <title>{"Overview"}</title>
        <g fill="none" fillRule="evenodd">
            <path d="M0 0h24v24H0z" />
            <path
                stroke={color}
                strokeDasharray="0,0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 10.571V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7.429"
            />
            <path
                stroke={color}
                strokeDasharray="0,0"
                strokeLinecap="round"
                strokeWidth={2}
                d="M18 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            />
            <path
                stroke={color}
                strokeDasharray="0,0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m8 15 3-4 2 2 3-4"
            />
        </g>
    </svg>
)

export const InvoiceIcon = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <g fill={color}>
            <path
                fillRule="evenodd"
                d="M6.553 1.606C7.109 1.327 7.773 1 9 1c1.226 0 1.89.327 2.447.605l.016.008C11.9 1.831 12.236 2 13 2c1.237 0 1.97-.461 2.214-.645.38-.286.83-.262 1.14-.118.314.145.646.492.646 1.004V13h3a3 3 0 0 1 3 2.999V19c0 .925-.234 1.685-.637 2.29a3.632 3.632 0 0 1-1.416 1.23c-.49.244-.967.362-1.314.42A3.83 3.83 0 0 1 19 23H5c-.925 0-1.685-.234-2.29-.637a3.632 3.632 0 0 1-1.23-1.416A4.686 4.686 0 0 1 1 19V2.241c0-.512.332-.859.646-1.004.31-.144.76-.168 1.14.118C3.03 1.54 3.763 2 5 2c.764 0 1.101-.169 1.537-.387l.016-.007ZM3.003 19 3 3.684C3.54 3.866 4.207 4 5 4c1.227 0 1.89-.327 2.447-.606l.016-.008C7.9 3.17 8.236 3 9 3c.764 0 1.101.169 1.537.386l.016.008C11.109 3.673 11.773 4 13 4c.793 0 1.46-.134 2-.316V19c0 .783.168 1.448.463 2H5c-.575 0-.94-.14-1.18-.3a1.635 1.635 0 0 1-.55-.647A2.69 2.69 0 0 1 3.002 19Zm16.301 1.967c.216-.036.489-.106.749-.236.256-.129.482-.305.646-.551.16-.24.301-.605.301-1.18v-3.001A1 1 0 0 0 20 15h-3v4c0 .575.14.94.3 1.18.165.246.39.422.647.55a2.688 2.688 0 0 0 .995.267c.12.008.244-.01.362-.03Z"
                clipRule="evenodd"
            />
            <path d="M5 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1ZM5 12a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1ZM5 16a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" />
        </g>
    </svg>
)

export const InventoryIcon = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <path
            fill={color}
            d="M4.4 3A1.4 1.4 0 0 0 3 4.4V6a1 1 0 0 1-2 0V4.4A3.4 3.4 0 0 1 4.4 1H6a1 1 0 0 1 0 2H4.4ZM17 2a1 1 0 0 1 1-1h1.6A3.4 3.4 0 0 1 23 4.4V6a1 1 0 1 1-2 0V4.4A1.4 1.4 0 0 0 19.6 3H18a1 1 0 0 1-1-1ZM2 17a1 1 0 0 1 1 1v1.6A1.4 1.4 0 0 0 4.4 21H6a1 1 0 1 1 0 2H4.4A3.4 3.4 0 0 1 1 19.6V18a1 1 0 0 1 1-1Zm20 0a1 1 0 0 1 1 1v1.6a3.4 3.4 0 0 1-3.4 3.4H18a1 1 0 1 1 0-2h1.6a1.4 1.4 0 0 0 1.4-1.4V18a1 1 0 0 1 1-1Zm-4-9a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm-3 1a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V9Zm-5-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1ZM7 9a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V9Z"
        />
    </svg>
)

export const AddIcon = ({ color = '#000', width = "1em" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={width}
    >
        <title />
        <g
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            data-name="add"
        >
            <path d="M12 19V5M5 12h14" />
        </g>
    </svg>
)

export const ReviewIcon = ({ color = '#000', width = "1em", height = "1em" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1920"
        width={width}
        height={height}
    >
        <g
            fill={color}
            fillRule="evenodd"
        >
            <path
                fillRule="nonzero"
                d="M0 53v1813.33h1386.67v-320H1280v213.34H106.667V159.667H1280V373h106.67V53z"
            />
            <path d="M1226.67 1439.67c113.33 0 217.48-39.28 299.6-104.96l302.37 302.65c20.82 20.84 54.59 20.85 75.42.04 20.84-20.82 20.86-54.59.04-75.43l-302.41-302.68c65.7-82.12 104.98-186.29 104.98-299.623 0-265.097-214.91-480-480-480-265.1 0-480.003 214.903-480.003 480 0 265.093 214.903 480.003 480.003 480.003Zm0-106.67c206.18 0 373.33-167.15 373.33-373.333 0-206.187-167.15-373.334-373.33-373.334-206.19 0-373.337 167.147-373.337 373.334 0 206.183 167.147 373.333 373.337 373.333Z" />
        </g>
    </svg>
)

export const NotificationIcon = ({ color = "#000", width = "1em", height = "1em", strokeWidth = 2 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height}
    >
        <title />
        <g
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
        >
            <path d="M18.9 11.2s0-8.7-6.9-8.7-6.9 8.7-6.9 8.7v3.9l-2.6 2.4h19l-2.6-2.4ZM14.5 20.5s-.5 1-2.5 1-2.5-1-2.5-1" />
        </g>
    </svg>
)

export const TrendingIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m21 7-6.586 6.586a2 2 0 0 1-2.828 0l-1.172-1.172a2 2 0 0 0-2.828 0L3 17M21 7h-6m6 0v6"
        />
    </svg>
)

export const GraphTimeSeries = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        width="1em"
        height="1em"
    >
        <path
            d="M0 2v16h20v-1H1V2H0zm14.465 3-1.06 1.06h2.827L10.4 11.894l-3.677-1.84a.5.5 0 0 0-.577.093l-4 4c-.49.472.236 1.198.708.708L6.6 11.107l3.677 1.84a.5.5 0 0 0 .577-.093l6.085-6.086v2.828L18 8.536V5h-3.535z"
            style={{
                fill: color,
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0,
            }}
        />
    </svg>
)

export const CoinsIcons = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 359.967 359.967"
    >
        <path d="M269.967 136.038V89.996c0-22.002-15.426-41.832-43.436-55.836-24.705-12.352-57.217-19.155-91.547-19.155-34.334 0-66.847 6.803-91.551 19.155C15.425 48.164 0 67.994 0 89.996V269.97c0 22.003 15.425 41.832 43.434 55.837 24.704 12.352 57.217 19.154 91.551 19.154 26.155 0 51.089-3.902 72.629-11.302 14.236 7.224 30.327 11.302 47.354 11.302 57.897 0 105-47.103 105-105-.001-52.804-39.184-96.622-90.001-103.923zM30 198.013c4.091 2.765 8.567 5.378 13.434 7.811 24.704 12.352 57.218 19.155 91.551 19.155 5.414 0 10.796-.179 16.128-.516a105.498 105.498 0 0 0-1.146 15.499c0 4.899.345 9.72.998 14.442a224.76 224.76 0 0 1-15.98.566C74.897 254.971 30 231.217 30 209.979v-11.966zm130.833-4.53a221.616 221.616 0 0 1-25.849 1.495C74.897 194.979 30 171.226 30 149.988v-11.966c4.091 2.765 8.567 5.378 13.434 7.81 24.704 12.353 57.218 19.155 91.551 19.155 18.472 0 36.403-1.986 52.89-5.73a105.661 105.661 0 0 0-27.042 34.226zM134.984 45.005c60.086 0 104.982 23.753 104.982 44.991s-44.896 44.992-104.982 44.992C74.897 134.988 30 111.234 30 89.996c0-21.238 44.897-44.991 104.984-44.991zM30 269.971v-11.965c4.091 2.765 8.567 5.377 13.434 7.81 24.704 12.352 57.217 19.155 91.551 19.155 8.28 0 16.502-.407 24.573-1.194a105.363 105.363 0 0 0 17.943 26.99c-13.367 2.737-27.84 4.195-42.517 4.195C74.897 314.962 30 291.208 30 269.971zm224.967 44.991c-41.355 0-75-33.645-75-75 0-41.238 33.457-74.802 74.652-74.991.117.003.23.018.348.018s.23-.015.348-.018c41.195.189 74.652 33.753 74.652 74.991 0 41.355-33.645 75-75 75z" />
    </svg>
)

export const TimeGraph = ({ color = '#000' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
    >
        <path d="M136.948 908.811c5.657 0 10.24-4.583 10.24-10.24V610.755c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 0 0-10.24 10.24v287.816c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V610.755c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v287.816c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.96c5.657 0 10.24-4.583 10.24-10.24V551.322c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 0 0-10.24 10.24v347.249c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V551.322c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v347.249c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.342c5.657 0 10.24-4.583 10.24-10.24V492.497c0-5.651-4.588-10.24-10.24-10.24h-81.92c-5.652 0-10.24 4.589-10.24 10.24v406.692c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V492.497c0-28.271 22.924-51.2 51.2-51.2h81.92c28.276 0 51.2 22.929 51.2 51.2v406.692c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.958c5.657 0 10.24-4.583 10.24-10.24V441.299c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 0 0-10.24 10.24v457.892c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V441.299c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v457.892c0 28.278-22.922 51.2-51.2 51.2zm-6.205-841.902C677.379 271.088 355.268 367.011 19.245 387.336c-11.29.683-19.889 10.389-19.206 21.679s10.389 19.889 21.679 19.206c342.256-20.702 670.39-118.419 964.372-284.046 9.854-5.552 13.342-18.041 7.79-27.896s-18.041-13.342-27.896-7.79z" />
        <path d="m901.21 112.64 102.39.154c11.311.017 20.494-9.138 20.511-20.449s-9.138-20.494-20.449-20.511l-102.39-.154c-11.311-.017-20.494 9.138-20.511 20.449s9.138 20.494 20.449 20.511z" />
        <path d="m983.151 92.251-.307 101.827c-.034 11.311 9.107 20.508 20.418 20.542s20.508-9.107 20.542-20.418l.307-101.827c.034-11.311-9.107-20.508-20.418-20.542s-20.508 9.107-20.542 20.418z" />
    </svg>
)

export const TotalIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
    >
        <path d="M22 13v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v6h16v-6a1 1 0 0 1 2 0ZM12 3a1 1 0 0 0-1 1v4H7a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4V4a1 1 0 0 0-1-1Z" />
    </svg>
)

export const ClockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 512 512"
    >
        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 469.3c-117.8 0-213.3-95.5-213.3-213.3 0-117.8 95.5-213.3 213.3-213.3 117.8 0 213.3 95.5 213.3 213.3 0 117.8-95.5 213.3-213.3 213.3zm-21.3-256L181.3 160l-32 32 128 128V85.3h-42.7v128z" />
    </svg>
)

export const CreatUserIcon = ({ color = '#000', width = "1em" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={width}
        height={width}
    >
        <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 20v-1a5 5 0 0 1 5-5h3.75m4.785-.036V17.5m0 0v3.535m0-3.535h3.536m-3.536 0H14M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
        />
    </svg>
)

export const CartIcon = ({ color = '#000', width = "2m", height = '2em' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={width}
        height={height}
    >
        <g stroke="#000" strokeWidth={1.5}>
            <path d="M7.5 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM16.5 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            <path
                strokeLinecap="round"
                d="m2 3 .261.092c1.302.457 1.953.686 2.325 1.231.372.545.372 1.268.372 2.715V9.76c0 2.942.063 3.912.93 4.826.866.914 2.26.914 5.05.914H12m4.24 0c1.561 0 2.342 0 2.894-.45.551-.45.709-1.214 1.024-2.743l.5-2.424c.347-1.74.52-2.609.076-3.186-.443-.577-1.96-.577-3.645-.577h-6.065m-6.066 0H7"
            />
        </g>
    </svg>
)