import IConfig from './../../../src/classes/IConfig';

/**
 * Specifies the browser target for the Editor instance.
 */
export interface ILauncherTarget {
  /**
   * Show Editor in a separate browser window or inline (in an iframe)
   */
  type?: 'window' | 'inline';

  /**
   * Depending on [[ILauncherTarget.type]] specifies either a window
   * or an HTML element where Editor should be rendered.
   */
  target?: string | HTMLElement | Window;

  /**
   * In case of a `window` target, specify browser window features here.
   */
  windowFeatures?: string;
}

/**
 * amCharts 4 Editor launcher configuration settings.
 */
export interface ILauncherConfig {
  /**
   * Configuration for the Editor instance.
   */
  editorConfig: IConfig;
  /**
   * Editor target settings specifying where to open the Editor.
   */
  target?: ILauncherTarget;
  /**
   * Location of the Editor app files.
   * @default /am4editor/
   */
  editorUrl?: string;
  /**
   * Callback to call when user presses OK/save button in the editor.
   *
   * @param chartConfig Chart created or edited in the Editor.
   * @param appliedThemes Themes selected in the Editor.
   * @param appliedLicenses License infromation entered in the Editor.
   */
  okCallback?: (
    chartConfig: object,
    appliedThemes?: string[],
    appliedLicenses?: string[]
  ) => void;
  /**
   * Callback to call when the user closes the Editor without saving.
   */
  cancelCallback?: () => void;
}
