<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-lg font-medium text-gray-900">Organization Settings</h2>
    <p class="mt-1 text-sm text-gray-500">
      Manage your organization details and team members.
    </p>

    <div class="mt-6 space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Organization Name</label>
        <input
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-buffer-blue focus:ring focus:ring-buffer-blue focus:ring-opacity-50"
          placeholder="Your organization name"
        />
      </div>

      <div>
        <h3 class="text-sm font-medium text-gray-900 mb-4">Team Members</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div>
                <p class="text-sm font-medium text-gray-900">You</p>
                <p class="text-sm text-gray-500">Owner</p>
              </div>
            </div>
          </div>
          <button class="btn-primary">Invite Team Member</button>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-medium text-gray-900 mb-4">Workspace Settings</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">Time Zone</p>
              <p class="text-sm text-gray-500">UTC</p>
            </div>
            <button class="btn-secondary">Change</button>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-900">Language</p>
              <p class="text-sm text-gray-500">English</p>
            </div>
            <button class="btn-secondary">Change</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>