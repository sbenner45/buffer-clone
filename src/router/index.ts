import { createRouter, createWebHistory } from 'vue-router';
import Publishing from '../views/Publishing.vue';
import Analytics from '../views/Analytics.vue';
import Engagement from '../views/Engagement.vue';
import StartPage from '../views/StartPage.vue';
import Channels from '../views/settings/Channels.vue';
import ChannelSettings from '../views/settings/ChannelSettings.vue';
import ChannelPosts from '../views/settings/ChannelPosts.vue';
import Account from '../views/settings/Account.vue';
import Billing from '../views/settings/Billing.vue';
import Organization from '../views/settings/Organization.vue';
import ChannelView from '../views/ChannelView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/publishing' },
    { path: '/publishing', component: Publishing },
    { path: '/analytics', component: Analytics },
    { path: '/engagement', component: Engagement },
    { path: '/start-page', component: StartPage },
    { path: '/channels/:channelId', component: ChannelView },
    { 
      path: '/settings',
      children: [
        { path: 'channels', component: Channels },
        { path: 'channels/:channelId/settings', component: ChannelSettings },
        { path: 'channels/:channelId/posts', component: ChannelPosts },
        { path: 'account', component: Account },
        { path: 'billing', component: Billing },
        { path: 'organization', component: Organization }
      ]
    }
  ]
});

export default router;