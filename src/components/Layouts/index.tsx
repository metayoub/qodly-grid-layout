import config, { ILayoutsProps } from './Layouts.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Layouts.build';
import Render from './Layouts.render';
import './index.css';

const Layouts: T4DComponent<ILayoutsProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Layouts.craft = config.craft;
Layouts.info = config.info;
Layouts.defaultProps = config.defaultProps;

export default Layouts;
