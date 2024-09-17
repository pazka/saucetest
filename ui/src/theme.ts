import { ThemeConfig } from "antd";
import "antd/dist/reset.css";
import './styles/global.scss';

export const antTheme: ThemeConfig = {
    token: {
        colorPrimary: '#00DD55',
        colorTextBase: '#DDDDDD',
        
        colorBgBase: '#111',
        colorBgBlur: '#222222',
        colorBgTextHover: '#00DD55',
        colorBgTextActive: '#00DD55',
        
        fontFamily: 'consolas',
        
        colorLink: '#00DD55',
        colorLinkActive: '#55AA55',
        colorLinkHover: '#FFDD55',
        
        colorFillContentHover: '#00DD55',
        colorFillContent: '#00DD55',
    },
}

