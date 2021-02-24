import React from 'react'
import PropTypes from 'prop-types'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import {
  javascript,
  jsx,
  markup,
  css,
  shellSession,
  python,
} from 'react-syntax-highlighter/dist/cjs/languages/prism'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('markup', markup)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('shell', shellSession)
SyntaxHighlighter.registerLanguage('python', python)

export default function CodeHighlighter({ children }) {
  // console.log(SyntaxHighlighter.supportedLanguages)
  const lang = children.props.className
    ? children.props.className.slice('language-'.length)
    : 'javascript'
  // console.log(lang)
  return (
    <SyntaxHighlighter language={lang} style={theme}>
      {children.props.children.slice(0, -1)}
      {/* 最終行が空行になるため最後尾の改行を取る */}
    </SyntaxHighlighter>
  )
}

CodeHighlighter.propTypes = {
  children: PropTypes.node.isRequired,
}
