# Incident Handler Node-RED Module

This Node-RED module, named `incident-handler`, is a custom node that handles incident information, such as incident details, start, acknowledgement, and stop messages. It has been designed to be used in Node-RED flows for managing and processing incident-related data.

This module is based on and inspired by the [`node-red-contrib-wip`](https://github.com/hj91/node-red-contrib-wip) module created by Harshad Joshi.

## Features

- Processes and manages incident-related messages with specific topics.
- Combines incident details, start, acknowledgement, and stop messages into a single output.
- Automatically generates timestamps in a specific format for each received message.
- Provides error handling for invalid message topics.

## Installation

To install this module, navigate to your Node-RED user directory (typically `~/.node-red`) or just  run the following command:

```
npm install node-red-contrib-incident-handler
```

After installation, restart your Node-RED instance, and the `incident-handler` node should be available in the node palette.

## Usage

1. Drag and drop the `incident-handler` node into your Node-RED flow.
2. Connect the input and output of the node to other nodes in your flow, as needed.
3. Send input messages with topics `incident`, `start`, `ack`, `stop`, and `reset` to the node.
4. The node will process the messages and send a combined output message when all required inputs are received.

## Use Case

The Incident Handler Node-RED module can be useful in situations where you need to monitor, manage, and process incident-related information in a structured manner. Some possible use cases include:

1. Incident Management Systems: This module can be integrated into incident management systems, allowing you to manage and process incident-related messages. This can help streamline the process of handling incidents, reducing response times, and ensuring that all necessary steps are followed.

2. IT Operations and Monitoring: In IT operations and monitoring, this module can be used to manage and process alerts and notifications related to incidents. By combining incident details, start, acknowledgement, and stop messages, the module can provide a comprehensive overview of each incident, facilitating efficient incident resolution.

3. Emergency Response Services: Emergency response services can utilize this module to manage and process incident-related information in real-time. By handling and organizing incident-related messages, the module can help emergency response teams effectively coordinate their efforts and respond to incidents more quickly.

4. Industrial Control Systems: In industrial control systems, the module can be used to manage and process incident-related information, allowing operators to quickly identify and address issues, minimizing downtime and ensuring smooth operations.

Overall, the Incident Handler Node-RED module can be beneficial in any situation where managing and processing incident-related information is essential. By automating and streamlining the process, the module can help improve the efficiency and effectiveness of incident handling and resolution.


## License

This module is released under the [GNU General Public License v3.0](LICENSE). Please note that the original work by Harshad Joshi, [`node-red-contrib-wip`](https://github.com/hj91/node-red-contrib-wip), is released under the Apache License 2.0. By modifying and distributing this code under the GPL license, you must also comply with the original license terms.


## Author

Harshad Joshi

- Email: [harshad@bufferstack.io](mailto:harshad@bufferstack.io)

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss proposed changes or report bugs.

## Support

For support, please reach out to Harshad Joshi at [harshad@bufferstack.io](mailto:harshad@bufferstack.io).

## Changelog 16-04-2024

Internal variable Duration now changed to incidentDuration to avoid query related issues when data is stored in InfluxDB 
