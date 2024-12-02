<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-lg font-medium text-gray-900">Billing Settings</h2>
    <p class="mt-1 text-sm text-gray-500">
      Manage your subscription and billing information.
    </p>

    <div class="mt-6 space-y-6">
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-sm font-medium text-gray-900">Current Plan</h3>
        <p class="mt-1 text-sm text-gray-500">Free Plan</p>
        <button class="mt-4 btn-primary">Upgrade Plan</button>
      </div>

      <div>
        <h3 class="text-sm font-medium text-gray-900 mb-4">Payment Method</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 border rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-200 rounded"></div>
              <div>
                <p class="text-sm font-medium text-gray-900">•••• 4242</p>
                <p class="text-sm text-gray-500">Expires 12/24</p>
              </div>
            </div>
            <button class="text-gray-600 hover:text-gray-900">Edit</button>
          </div>
          <button class="btn-secondary">Add Payment Method</button>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-medium text-gray-900 mb-4">Billing History</h3>
        <div class="border rounded-lg divide-y">
          <div class="p-4">
            <p class="text-sm font-medium text-gray-900">No billing history</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>