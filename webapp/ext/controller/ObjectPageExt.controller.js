sap.ui.define(
  "zdab.ddic.object.display.ext.controller.ObjectPageExt",
  ["zdab/ddic/object/display/ext/libs/plantuml-encoder"],
  function (plantumlEncoder) {
    "use strict";
    return {
      onGetUMLDiagram: function (oEvent) {
        debugger;

        let sAbapObjectType = oEvent
          .getSource()
          .getBindingContext()
          .getObject().ABAPObjectType;
        let sAbapObject = oEvent
          .getSource()
          .getBindingContext()
          .getObject().ABAPObject;

        let UMLDiagramCode = oEvent
          .getSource()
          .getModel()
          .getProperty(
            "/ClassObject(ABAPObjectType='" +
              sAbapObjectType +
              "',ABAPObject='" +
              sAbapObject +
              "')"
          ).UMLDiagramCode;

        let umlCompressedEncode = window.plantumlEncoder.encode(
          decodeURIComponent(UMLDiagramCode)
        );

        this.byId("idUmlDiagramSVG").setSrc(
          "https://www.plantuml.com/plantuml/svg/" + umlCompressedEncode
        );
      },

      // onAfterRendering: function (oEvent) {
      //   this.byId("idUmlDiagramSVG").setSrc("");
      // },
    };
  }
);
