<template>
  <div class="avui-countdown">
    <div class="avui-countdown-title" v-if="showTitle">
      {{ t("countdown.title") }}
    </div>
    <div class="avui-countdown-content">
      <div class="avui-countdown-item">
        <span class="avui-countdown-item-value">
          <span :style="`--value: ${days}`"></span>
        </span>
        <span class="avui-countdown-item-label">
          {{ t("countdown.days") }}
        </span>
      </div>

      <div class="avui-countdown-item">
        <span class="avui-countdown-item-value">
          <span :style="`--value: ${hours}`"></span>
        </span>
        <span class="avui-countdown-item-label">
          {{ t("countdown.hours") }}
        </span>
      </div>
      <div class="avui-countdown-item">
        <span class="avui-countdown-item-value">
          <span :style="`--value: ${minutes}`"></span>
        </span>
        <span class="avui-countdown-item-label">
          {{ t("countdown.min") }}
        </span>
      </div>
      <div class="avui-countdown-item">
        <span class="avui-countdown-item-value">
          <span :style="`--value: ${seconds}`"></span>
        </span>
        <span class="avui-countdown-item-label">
          {{ t("countdown.sec") }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: number | Date;
  showTitle?: boolean;
}>();
const { t } = useI18n();
const targetDate = ref<number>(
  props.value
    ? new Date(props.value).getTime()
    : new Date().getTime() + 15 * 60 * 1000 + 5 * 1000
);
const currentTime = ref(new Date().getTime());

const days = computed(() =>
  formatTime(Math.floor((targetDate.value - currentTime.value) / 86400000))
);

const hours = computed(() =>
  formatTime(Math.floor((targetDate.value - currentTime.value) / 3600000))
);
const minutes = computed(() =>
  formatTime(
    Math.floor(((targetDate.value - currentTime.value) % 3600000) / 60000)
  )
);
const seconds = computed(() =>
  formatTime(
    Math.floor(((targetDate.value - currentTime.value) % 60000) / 1000)
  )
);

function formatTime(time: number) {
  return time.toString().padStart(2, "0");
}

function updateCountdown() {
  currentTime.value = new Date().getTime();
}

let countdownInterval: NodeJS.Timeout | null = null;

onMounted(() => {
  countdownInterval = setInterval(updateCountdown, 1000);
});

onBeforeUnmount(() => {
  countdownInterval && clearInterval(countdownInterval);
});
</script>

<style lang="postcss">
:root .avui-countdown {
  line-height: 1em;
}

.avui-countdown {
  display: inline-flex;

  & > * {
    height: 1em;
    @apply inline-block overflow-y-hidden;

    &:before {
      position: relative;
      content: "00\A 01\A 02\A 03\A 04\A 05\A 06\A 07\A 08\A 09\A 10\A 11\A 12\A 13\A 14\A 15\A 16\A 17\A 18\A 19\A 20\A 21\A 22\A 23\A 24\A 25\A 26\A 27\A 28\A 29\A 30\A 31\A 32\A 33\A 34\A 35\A 36\A 37\A 38\A 39\A 40\A 41\A 42\A 43\A 44\A 45\A 46\A 47\A 48\A 49\A 50\A 51\A 52\A 53\A 54\A 55\A 56\A 57\A 58\A 59\A 60\A 61\A 62\A 63\A 64\A 65\A 66\A 67\A 68\A 69\A 70\A 71\A 72\A 73\A 74\A 75\A 76\A 77\A 78\A 79\A 80\A 81\A 82\A 83\A 84\A 85\A 86\A 87\A 88\A 89\A 90\A 91\A 92\A 93\A 94\A 95\A 96\A 97\A 98\A 99\A";
      white-space: pre;
      top: calc(var(--value) * -1em);
    }
  }
}

.avui-countdown {
  & > * {
    &:before {
      text-align: center;
      transition: all 1s cubic-bezier(1, 0, 0, 1);
    }
  }
}

.avui-countdown-title {
  @apply text-lg font-bold leading-none text-center text-black;
}

.avui-countdown-content {
  @apply justify-center w-full text-center grid grid-flow-col gap-5 auto-cols-max;
}

.avui-countdown-item {
  @apply flex flex-col p-2;
}

.avui-countdown-item-label {
  @apply text-base;
}

.avui-countdown-item-value {
  @apply font-mono text-5xl text-black countdown;
}
</style>
