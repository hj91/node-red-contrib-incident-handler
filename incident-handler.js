// incident-handler.js
// Harshad Joshi, Bufferstack.IO Analytics Technology LLP
// Release date - 23 April 2023
// License - https://github.com/hj91/node-red-contrib-incident-handler/LICENSE 
// Released under GPL 3.0


module.exports = function (RED) {
  function IncidentHandlerNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    function formatDate(date) {
      return [
        ('0' + date.getDate()).slice(-2),
        ('0' + (date.getMonth() + 1)).slice(-2),
        date.getFullYear()
      ].join('-');
    }

    function formatTime(date) {
      return [
        ('0' + date.getHours()).slice(-2),
        ('0' + date.getMinutes()).slice(-2),
        ('0' + date.getSeconds()).slice(-2)
      ].join(':');
    }

    var incident = null;
    var startTime = null;
    var combinedMessage = {};
    var receivedTopics = new Set();
    const allowedTopics = new Set(['incident', 'start', 'ack', 'stop', 'reset']);

    node.on('input', function (msg) {
      if (!allowedTopics.has(msg.topic)) {
        node.send({ payload: { error: 'Invalid topic received: ' + msg.topic } });
        return;
      }

      if (msg.topic === 'incident') {
        incident = msg.payload;
        combinedMessage.incident = incident;
        receivedTopics.add('incident');
      } else if (msg.topic === 'start' && msg.payload) {
        if (!receivedTopics.has('incident')) {
          return;
        }
        startTime = new Date();
        var dateStr = formatDate(startTime);
        var timeStr = formatTime(startTime);
        incident = incident || 'No incident details';
        combinedMessage.start = dateStr + ' ' + timeStr + ' - ' + incident;
        receivedTopics.add('start');
      } else if (msg.topic === 'ack' && msg.payload) {
        if (!receivedTopics.has('start')) {
          return;
        }
        var currentTime = new Date();
        var dateStr = formatDate(currentTime);
        var timeStr = formatTime(currentTime);
        if (receivedTopics.has('stop')) {
          var stopTimestamp = combinedMessage.stop.split(' - ')[0];
          dateStr = stopTimestamp.split(' ')[0];
          timeStr = stopTimestamp.split(' ')[1];
        }
        combinedMessage.ack = dateStr + ' ' + timeStr + ' - Incident acknowledged';
        receivedTopics.add('ack');
      } else if (msg.topic === 'stop' && msg.payload) {
        if (!receivedTopics.has('start')) {
          return;
        }
        var stopTime = new Date();
        var dateStr = formatDate(stopTime);
        var timeStr = formatTime(stopTime);
        var duration = startTime ? (stopTime - startTime) / 1000 : 'N/A';
        combinedMessage.stop = dateStr + ' ' + timeStr + ' - Incident cleared';
        startTime = null;
        receivedTopics.add('stop');

        // Add 'ack' with the same timestamp as 'stop' if it has not been received yet
        if (!receivedTopics.has('ack')) {
          combinedMessage.ack = dateStr + ' ' + timeStr + ' - Incident acknowledged';
          receivedTopics.add('ack');
        }
        
        combinedMessage.duration = 'Duration: ' + duration;
      } else if (msg.topic === 'reset' && msg.payload) {
        incident = null;
        startTime = null;
        combinedMessage = {};
        receivedTopics.clear();
      }

      if (receivedTopics.has('incident') && receivedTopics.has('start') && receivedTopics.has('stop')) {
        node.send({ payload: combinedMessage });
      }
    });
  }

  RED.nodes.registerType('incident-handler', IncidentHandlerNode);
};

