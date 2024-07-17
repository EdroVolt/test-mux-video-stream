import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_ACCESS_TOKEN,
  tokenSecret: process.env.MUX_SECRET,
});

export const createLiveStream = async () => {
  try {
    const liveStream = await mux.video.liveStreams.create({
      playback_policy: "public",
      new_asset_settings: { playback_policy: "public" },
      reconnect_window: 10,
    });
    return liveStream;
  } catch (error) {
    console.error("Error creating live stream:", error);
    throw error;
  }
};
