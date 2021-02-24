import React from 'react'
import CodeHighlighter from '../components/code-highlighter'

const tw = {
  H1: 'text-4xl mt-8 mb-6', // 2.5rem(2.25rem) + 3rem = 5.5rem + .5rm
  H2: 'text-2xl mt-6 mb-4', // 2rem(1.5rem) + 2rem = 4rem + .5rem
  H3: 'text-xl mt-5 mb-4', // 1.75rem(1.125rem) + 1.75rem = 3.5rem + .5rem
  H4: 'text-base mt-4 mb-3', // 1.5rem(1rem) + 1.25rem = 2.75rem + .5rem
  H5: 'text-sm mt-4 mb-2', // 1.25rem(0.875rem) + 1rem = 2.25rem + .5rem
  H6: 'text-xs mt-4 mb-2', // 1rem(0.75rem) + 1rem = 2rem + .5rem
  A: 'underline text-dclOrange',
  P: 'leading-relax mb-6', // relax -> line-height: 1.625
  BQ: 'leading-relax px-2 mx-2 border-l-4 border-dclCyan quote',
  UL: 'list-disc list-inside my-4 ml-2',
  OL: 'list-decimal my-4 ml-6',
  LI: 'm-0.5',
  TABLE: 'table-auto border-collapse border w-full mb-4',
  TH: 'border border-gray-500 p-1 font-bold bg-gray-700',
  TD: 'border border-gray-500 p-1 pr-2 text-right',
  IFRAME: 'w-full',
}

const MDXComponents = {
  h1: (props) => <h1 className={tw.H1} {...props} />, 
  h2: (props) => <h2 className={tw.H2} {...props} />,
  h3: (props) => <h3 className={tw.H3} {...props} />,
  h4: (props) => <h4 className={tw.H4} {...props} />,
  h5: (props) => <h5 className={tw.H5} {...props} />,
  h6: (props) => <h6 className={tw.H6} {...props} />,
  p: (props) => <p className={tw.P} {...props} />,
  blockquote: (props) => <blockquote className={tw.BQ} {...props} />,
  a: (props) => <a className={tw.A} {...props} />,
  ul: (props) => <ul className={tw.UL} {...props} />,
  ol: (props) => <ol className={tw.OL} {...props} />,
  li: (props) => <li className={tw.LI} {...props} />,
  ifram: (props) => <iframe className={tw.IFRAME} {...props} />,
  table: (props) => <table className={tw.TABLE} {...props} />,
  th: (props) => <th className={tw.TH} {...props} />,
  td: (props) => <td className={tw.TD} {...props} />,
  pre: (props) => <CodeHighlighter {...props} />,
  // img: p > img,
  // code: p > code,
}

export default MDXComponents