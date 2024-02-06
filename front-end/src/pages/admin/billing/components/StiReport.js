import React, { useEffect } from "react";
import rpt from './PrintSaleSlip.mrt'

const StiReport =  ({orderData}) => {
  window.Stimulsoft.Base.StiLicense.Key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkcgIvwL0jnpsDqRpWg5FI5kt2G7A0tYIcUygBh1sPs7plofUOqPB1a4HBIXJB621mau2oiAIj+ysU7gKUXfjn/D5BocmduNB+ZMiDGPxFrAp3PoD0nYNkkWh8r7gBZ1v/JZSXGE3bQDrCQCNSy6mgby+iFAMV8/PuZ1z77U+Xz3fkpbm6MYQXYp3cQooLGLUti7k1TFWrnawT0iEEDJ2iRcU9wLqn2g9UiWesEZtKwI/UmEI2T7nv5NbgV+CHguu6QU4WWzFpIgW+3LUnKCT/vCDY+ymzgycw9A9+HFSzARiPzgOaAuQYrFDpzhXV+ZeX31AxWlnzjDWqpfluygSNPtGul5gyNt2CEoJD1Yom0VN9fvRonYsMsimkFFx2AwyVpPcs+JfVBtpPbTcZscnzUdmiIvxv8Gcin6sNSibM6in/uUKFt3bVgW/XeMYa7MLGF53kvBSwi78poUDigA2n12SmghLR0AHxyEDIgZGOTbNI33GWu7ZsPBeUdGu55R8w=";
  var report = new window.Stimulsoft.Report.StiReport();
  var options = new window.Stimulsoft.Viewer.StiViewerOptions();
  var viewer = new window.Stimulsoft.Viewer.StiViewer(
    null,
    "StiViewer",
    false
  );

useEffect(() => {
// if (props.show == true) {

  

  // options.appearance.fullScreenMode = true;
  // options.height = "100%";
  // options.appearance.scrollbarsMode = true;
  // options.toolbar.showDesignButton = true;

        report.loadFile(rpt);
        report.dictionary.databases.clear();
        console.log("json data",orderData)
        report.regData("demo", "demo", JSON.stringify(orderData));
        // console.log(report)
        viewer.report = report;
        viewer.renderHtml("viewer");
    // }
},[])

return (
<>
{        console.log("json data",orderData)
}
  <div id="viewer"></div>
  
</>
);
};

export default StiReport