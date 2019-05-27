import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    routes: [
        // {
        //   path: '/',
        //   name: 'home',
        //   component: Home
        // },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () =>
                import ('./views/home/home.vue'),
            meta: {
                showFooter: true,
            }
        },
        {
            path: '/search',
            name: 'serach',
            component: () =>
                import ('./views/search/search.vue'),
            meta: {
                showFooter: true
            }
        },
        {
            path: '/list',
            name: 'list',
            component: () =>
                import ('./views/list/list.vue'),
            meta: {
                showFooter: true
            }
        },
        {
            path: '/my',
            name: 'my',
            component: () =>
                import ('./views/my/my.vue'),
            meta: {
                showFooter: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('./views/login.vue')
        },
        {
            path: '/shop',
            component: () =>
                import ('./views/shop/shop.vue'),
            children: [{
                path: '/shop/goods',
                component: () =>
                    import ('./views/shop/shopGoods.vue')
            }, {
                path: '/shop/info',
                component: () =>
                    import ('./views/shop/shopInfo.vue')
            }, {
                path: '/shop/rating',
                component: () =>
                    import ('./views/shop/shopRating.vue')
            }, {
                path: '',
                redirect: '/shop/goods'
            }]
        }

    ]
})