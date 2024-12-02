<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import ImageEditor from '@uppy/image-editor';
import XHRUpload from '@uppy/xhr-upload';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/image-editor/dist/style.css';

const props = defineProps<{
  maxFiles?: number;
}>();

const emit = defineEmits<{
  (e: 'upload', files: string[]): void;
}>();

const uppyInstance = ref<any>(null);
const dashboardElement = ref<HTMLElement | null>(null);

onMounted(() => {
  uppyInstance.value = new Uppy({
    restrictions: {
      maxNumberOfFiles: props.maxFiles || 4,
      allowedFileTypes: ['image/*', 'video/*']
    },
    autoProceed: true
  });

  uppyInstance.value
    .use(Dashboard, {
      inline: true,
      target: dashboardElement.value,
      height: 300,
      proudlyDisplayPoweredByUppy: false
    })
    .use(ImageEditor, {
      quality: 0.8
    })
    .use(XHRUpload, {
      endpoint: 'https://your-upload-endpoint.com/upload',
      formData: true,
      fieldName: 'files[]'
    });

  uppyInstance.value.on('complete', (result: any) => {
    const urls = result.successful.map((file: any) => URL.createObjectURL(file.data));
    emit('upload', urls);
  });
});

onUnmounted(() => {
  uppyInstance.value?.close();
});
</script>

<template>
  <div class="border rounded-lg p-4">
    <div ref="dashboardElement"></div>
  </div>
</template>