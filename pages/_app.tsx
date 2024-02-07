// ログインとユーザー登録の画面の表示がおかしくなるのでglobals.cssは読み込まない
// import '../styles/globals.css'
// ↓ これを追加してBootstrapで読み込む
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react"
import { AuthProvider } from "../lib/AuthContext"

export default function MyApp({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) {
  return (<>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>)

}
