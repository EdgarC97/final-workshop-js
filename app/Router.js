import { routes } from "./routes";

export function Router() {
  const path = window.location.pathname;

  const publicRoute = routes.public.find((route) => route.path === path);

  if (publicRoute) {
    publicRoute.scene();
    return;
  }

  navigateTo("/not-found");
}

export function navigateTo(path) {
  window.history.pushState({}, "", window.location.origin + path);
  Router();
}
