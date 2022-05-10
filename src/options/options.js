/**
 * Starter module for addon settings site.
 *
 * @requires modules/OptionHandler
 */

import * as AddonSettings from "/common/modules/AddonSettings/AddonSettings.js";
import * as AutomaticSettings from "/common/modules/AutomaticSettings/AutomaticSettings.js";

import * as CustomOptionTriggers from "./modules/CustomOptionTriggers.js";
import * as ManualAdjustments from "./modules/ManualAdjustments.js";

// init modules
CustomOptionTriggers.registerTrigger();
AutomaticSettings.setDefaultOptionProvider(AddonSettings.getDefaultValue);
AutomaticSettings.init();
ManualAdjustments.init();
