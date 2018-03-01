import Loadable from "react-loadable";
import LoadingAsync from "common/LoadingAsync";

export default function loadAsync(component) {
  return Loadable({
    loader: component,
    loading: LoadingAsync,
    delay: 200,
    timeout: 10000
  });
}
