import { Titillium_Web, Orbitron } from 'next/font/google'

const fontSans = Titillium_Web({
	subsets: ['latin'],
    display: 'swap',
	variable: '--font-sans',
    weight: ['400']
})

const fontDisplay = Orbitron({
	subsets: ['latin'],
    display: 'swap',
	variable: '--font-display',
    weight: ['400', '500']
})

const fonts = [fontSans, fontDisplay]

export const fontVariables = fonts.map(font => font.variable).join(' ')
