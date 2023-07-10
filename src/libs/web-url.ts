import { App } from '../App'
import * as pageDefault from '../page/default'
import * as home from '../page/home'
import * as testCopy from '../page/test copy'
import * as test from '../page/test' 
 export const routerPage = [{path:'/',element: () => App},
{path:'/home',element: () => App},
{path:'/master',element: () => App},
{path:'/master/*',element: () => App},
{path:'/test/:as/l',element: () => App}]
 export default [
    {url: "/", page: {url: "/",layout: "default", import: () => import('../page/default'), component: pageDefault}},
  {url: "/home", page: {url: "/home",layout: "default", import: () => import('../page/home'), component: home}},
  {url: "/master*", page: {url: "/master*",layout: "default", import: () => import('../page/test copy'), component: testCopy}},
  {url: "/test/:as/l", page: {url: "/test/:as/l",layout: "default", import: () => import('../page/test'), component: test}}
    ]