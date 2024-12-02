<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-lg font-medium text-gray-900">Connect your channels</h2>
    <p class="mt-1 text-sm text-gray-500">
      Connect and manage your social media accounts.
    </p>
    
    <div class="mt-6 space-y-4">
      <div
        v-for="channel in ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok']"
        :key="channel"
        class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div>
            <h3 class="text-sm font-medium text-gray-900">{{ channel }}</h3>
            <p class="text-sm text-gray-500">Not connected</p>
          </div>
        </div>
        
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Connect
        </button>
      </div>
    </div>
  </div>
</template>