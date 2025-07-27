export interface UseAlertOptions {
  noCookie?: boolean;
}
export const useAlert = (alertId?: string, options?: UseAlertOptions) => {
  const cookieValue = useCookie(`alert-${alertId}`, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 400),
  });
  const isShow = ref(true);

  if (!options?.noCookie && alertId != null) {
    isShow.value = cookieValue.value == null;
  }

  const dismiss = () => {
    if (!options?.noCookie && alertId != null) {
      cookieValue.value = "dismissed";
    }
    isShow.value = false;
  };

  return {
    isShow,
    dismiss,
  };
};
