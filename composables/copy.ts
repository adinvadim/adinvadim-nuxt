import libCopy from "clipboard-copy";

export const useCopy = () => {
  const pending = ref(false);
  const done = ref(false);
  const copy = async (value: string) => {
    pending.value = true;
    await libCopy(value);
    pending.value = false;
    done.value = true;
    setTimeout(() => {
      done.value = false;
    }, 2000);
  };
  return {
    pending,
    done,
    copy,
  };
};
