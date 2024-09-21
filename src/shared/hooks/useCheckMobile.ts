import { onMounted, onUnmounted, ref } from 'vue';

export const useCheckMobile = () => {
  const isMobile = ref(false);

  const checkMobile = () => {
    isMobile.value = window.innerWidth < 600; // Adjust the breakpoint as needed
    console.log('isMobile', isMobile.value);
  };

  onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });

  return isMobile;
};
