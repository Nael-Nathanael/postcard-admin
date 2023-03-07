CONTROLLER => error handling, validation, ...
MODEL => schema response api [ERROR, SUCCESS], ...
CONFIG => url, method, dto, header, (parse / transform) response, (parse / transform) body, ...


Example  Structure Folder:
  User: [--]
    model.dashboard.d.ts: --
      class abstract ServicesUserModel

    controller.dashboard.ts: -- 
      class ServicesUserController

    config.dashboard.ts: --
      class ServicesUserConfig implements ServicesUserConfigMethod
      class abstract ServicesUserConfigMethod
      class abstract ServicesUserConfigProps

