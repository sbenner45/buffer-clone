<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-lg font-medium text-gray-900">Account Settings</h2>
    <p class="mt-1 text-sm text-gray-500">
      Manage your account preferences and personal information.
    </p>

    <div class="mt-6 space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-buffer-blue focus:ring focus:ring-buffer-blue focus:ring-opacity-50"
          placeholder="Your name"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-buffer-blue focus:ring focus:ring-buffer-blue focus:ring-opacity-50"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Time Zone</label>
        <select
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-buffer-blue focus:ring focus:ring-buffer-blue focus:ring-opacity-50"
        >
          <option>UTC</option>
          <option>Eastern Time</option>
          <option>Pacific Time</option>
        </select>
      </div>

      <div class="pt-5">
        <button class="btn-primary">Save Changes</button>
      </div>
    </div>
  </div>
</template>