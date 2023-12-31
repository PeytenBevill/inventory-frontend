import { useState, useEffect } from "react";
import { TrendUp, Tag } from "@phosphor-icons/react";
import axios from "axios";
import "./inventory.css";

const Inventory = () => {
  const [isScannerConnected, setIsScannerConnected] = useState(false);

  useEffect(() => {
    const startScanner = async () => {
      try {
        // Check if the scanner is connected
        const scannerInfo = await axios.get(
          "https://second-inventory-backend.onrender.com/check-scanner"
        );
        if (scannerInfo.data.isScannerConnected) {
          console.log("Scanner connected!");
          setIsScannerConnected(true);
        } else {
          console.log("Scanner not connected.");
          setIsScannerConnected(false);
        }
      } catch (error) {
        console.error("Error checking scanner:", error.message);
      }
    };

    // Check scanner status when the component mounts
    startScanner();

    // Listen for USB device changes
    usb.on("add", startScanner);
    usb.on("remove", startScanner);

    // Clean up the USB event listeners when the component unmounts
    return () => {
      usb.removeAllListeners("add");
      usb.removeAllListeners("remove");
    };
  }, []);

  const handleStartScan = async () => {
    try {
      // Start the scan on the server
      await axios.post("https://second-inventory-backend.onrender.com/start-scan");

      // Display a message or handle the response as needed
      console.log("Scan started");
    } catch (error) {
      console.error("Error starting scan:", error.message);
    }
  };

  return (
    <div className="inventory-page">
      <section className="one">
        <p>
          <TrendUp size={32} weight="fill" />
          Analytics
        </p>
        <p>
          <Tag size={32} />
          Products
        </p>
      </section>
      <main className="two">
        {isScannerConnected ? (
          <button onClick={handleStartScan}>Start Scan</button>
        ) : (
          <p>
            Scanner not connected. Please connect the scanner and refresh the
            page.
          </p>
        )}
      </main>
    </div>
  );
};

export default Inventory;
