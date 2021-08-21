sap.ui.define(
  "zdab.custom.ddic.object.display.ext.controller.ObjectPageExt",
  ["zdab/custom/ddic/object/display/ext/libs/plantuml-encoder"],
  function (plantumlEncoder) {
    "use strict";
    return {

      onInit: function () {
        this.extensionAPI.attachPageDataLoaded(this._onBeforeLoadingObjectPage.bind(this))
      },

      _onBeforeLoadingObjectPage: function (oEvent) {
        let oContext = oEvent.context;
        let oObjectPageContext = oContext.oModel.getProperty(oContext.sPath);
        if (oObjectPageContext && !oObjectPageContext.fc_hide_class_facet) {
          let imgUmlDiagram = this.byId("idUmlDiagramSVG");
          imgUmlDiagram.setSrc('');
          imgUmlDiagram.rerender();
        }
      },

      onGetUMLDiagram: function (oEvent) {
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

        // window.open("https://www.plantuml.com/plantuml/svg/" + umlCompressedEncode, '_blank').focus();

      }
    };
  }
);
