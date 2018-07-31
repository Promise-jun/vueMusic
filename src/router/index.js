import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//异步加载
const Recommend = resolve => {
  import('components/recommend/Recommend').then((recommend) => {
    resolve(recommend)
  })
}
const Singer = resolve => {
  import('components/singer/singer').then((singer) => {
    resolve(singer)
  })
}
const Rank = resolve => {
  import('components/rank/rank').then((rank) => {
    resolve(rank)
  })
}
const Search = resolve => {
  import('components/search/search').then((search) => {
    resolve(search)
  })
}
const SingerDetail = resolve => {
  import('components/singer-detail/singer-detail').then((singerDetail) => {
    resolve(singerDetail)
  })
}
const Disc = resolve => {
  import('components/disc/disc').then((disc) => {
    resolve(disc)
  })
}
const TopList = resolve => {
  import('components/top-list/top-list').then((toplist) => {
    resolve(toplist)
  })
}
const UserCenter = resolve => {
  import('components/user-center/user-center').then((userCenter) => {
    resolve(userCenter)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
