import { useEffect, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

export const RecordView = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    video: true,
    blobPropertyBag: {
      type: 'video/mp4',
    },
  });

  const [stopTime, setStopTime] = useState(true);

  useEffect(() => {
    const stopInterval = setInterval(() => {
      if (!stopTime) {
        stopRecording();
        handleSave();
        setStopTime(true);
      }
    }, 3000);

    return () => {
      clearInterval(stopInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopTime]);

  const handleSave = () => {
    const downloadRecordingPath = 'VideoRecord';
    const downloadRecordingType = 'mp4';
    const pathName = `${downloadRecordingPath}_${new Date().getTime()}.${downloadRecordingType}`;
    const link = document.createElement('a');
    link.href = mediaBlobUrl!;
    link.download = pathName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRecording = () => {
    startRecording();
    setStopTime(false);
  };

  return (
    <div className="container px-4 mx-auto">
      <h4 className="my-4 text-xl text-gray-300">
        Status:{' '}
        <span className={`${status !== 'recording' ? 'text-blue-300' : 'text-red-300'} uppercase`}>
          {status}
        </span>
      </h4>
      <button
        className="px-4 py-2 mr-2 text-base text-white bg-red-700 border-2 border-gray-400 border-solid rounded"
        onClick={handleRecording}>
        Start Recording
      </button>
      {/* <button
        disabled={true}
        className="px-4 py-2 text-base text-white bg-blue-700 border-2 border-gray-400 border-solid rounded"
        onClick={handleStopRecording}>
        Stop Recording
      </button> */}

      <video className="mt-4" width={640} height={480} src={mediaBlobUrl!} controls autoPlay loop />
    </div>
  );
};
