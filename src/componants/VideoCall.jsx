import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import "../global.js";
import { motion } from "framer-motion";
import { Video, VideoOff, Mic, MicOff, PhoneOff, Copy } from "lucide-react";

const VideoCall = ({ onEndCall }) => {
  const [myStream, setMyStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [error, setError] = useState(null);
  const [isStreamReady, setIsStreamReady] = useState(false);

  const myVideo = useRef();
  const remoteVideo = useRef();

  useEffect(() => {
    const initStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setMyStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
        setIsStreamReady(true);
      } catch (err) {
        setError("Failed to access camera and microphone");
        console.error("Media stream error:", err);
      }
    };

    initStream();

    return () => {
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
      }
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  const createPeer = () => {
    if (!myStream || !isStreamReady) {
      setError("Media stream not ready");
      return;
    }

    try {
      const newPeer = new Peer({
        initiator: true,
        trickle: false,
        stream: myStream,
      });

      newPeer.on("signal", (data) => {
        setPeerId(JSON.stringify(data));
      });

      newPeer.on("stream", (stream) => {
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = stream;
          setIsConnected(true);
        }
      });

      newPeer.on("error", (err) => {
        console.error("Peer error:", err);
        setError("Connection error occurred");
      });

      setPeer(newPeer);
    } catch (err) {
      console.error("Create peer error:", err);
      setError("Failed to create peer connection");
    }
  };

  const connectToPeer = () => {
    if (!myStream || !isStreamReady) {
      setError("Media stream not ready");
      return;
    }

    try {
      const newPeer = new Peer({
        initiator: false,
        trickle: false,
        stream: myStream,
      });

      newPeer.on("signal", (data) => {
        setPeerId(JSON.stringify(data));
      });

      newPeer.on("stream", (stream) => {
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = stream;
          setIsConnected(true);
        }
      });

      newPeer.on("error", (err) => {
        console.error("Peer error:", err);
        setError("Connection error occurred");
      });

      try {
        newPeer.signal(JSON.parse(remotePeerId));
      } catch (err) {
        setError("Invalid peer ID format");
        return;
      }

      setPeer(newPeer);
    } catch (err) {
      console.error("Connect peer error:", err);
      setError("Failed to connect to peer");
    }
  };

  const toggleMute = () => {
    myStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    myStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsVideoOff(!isVideoOff);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Local Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-lg overflow-hidden bg-black"
        >
          <video
            ref={myVideo}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
            You
          </div>
        </motion.div>

        {/* Remote Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-lg overflow-hidden bg-black"
        >
          <video
            ref={remoteVideo}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          {isConnected && (
            <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
              Remote User
            </div>
          )}
        </motion.div>
      </div>

      {!isConnected && (
        <div className="p-4 bg-white/10 backdrop-blur">
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <button
              onClick={createPeer}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Create Room
            </button>
            {peerId && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={peerId}
                  readOnly
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(peerId)}
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600"
                >
                  <Copy size={20} className="text-white" />
                </button>
              </div>
            )}
            <input
              type="text"
              placeholder="Enter peer ID to connect"
              value={remotePeerId}
              onChange={(e) => setRemotePeerId(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded"
            />
            <button
              onClick={connectToPeer}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Connect to Peer
            </button>
          </div>
        </div>
      )}

      {/* Call Controls */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="p-4 bg-black/50 backdrop-blur"
      >
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20"
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-red-500" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleVideo}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20"
          >
            {isVideoOff ? (
              <VideoOff className="w-6 h-6 text-red-500" />
            ) : (
              <Video className="w-6 h-6 text-white" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onEndCall}
            className="p-4 rounded-full bg-red-500 hover:bg-red-600"
          >
            <PhoneOff className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoCall;
