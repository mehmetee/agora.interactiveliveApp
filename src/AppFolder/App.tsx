import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { ClientRoleType, createAgoraRtcEngine, IRtcEngine, RtcSurfaceView, ChannelProfileType } from 'react-native-agora';
import { appId, channelName, token, uid } from '../data/data';
import Styles from './app.Style';

const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
  }
};

const App = () => {
  const agoraEngineRef = useRef<IRtcEngine>();
  const [isJoined, setIsJoined] = useState(false);
  const [isHost, setIsHost] = useState(true); 
  const [remoteUid, setRemoteUid] = useState<number[]>([]); 
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(ChannelProfileType.ChannelProfileLiveBroadcasting);
      if (isHost) {
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster
        });
      } else {
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid([]);
      setIsJoined(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDislike = () => {
    if (liked) {
      setLikeCount(prevCount => prevCount - 1);
      setLiked(false);
    }
    if (!disliked) {
      setDislikeCount(prevCount => prevCount + 1);
      setDisliked(true);
    } else {
      setDislikeCount(0);
      setDisliked(false);
    }
  };
  
  const handleLike = () => {
    if (disliked) {
      setDislikeCount(prevCount => prevCount - 1);
      setDisliked(false);
    }
    if (!liked) {
      setLikeCount(prevCount => prevCount + 1);
      setLiked(true);
    } else {
      setLikeCount(0);
      setLiked(false);
    }
  };
  
  useEffect(() => {
    setupVideoSDKEngine();
  }, []);

  const setupVideoSDKEngine = async () => {
    try {
      if (Platform.OS === 'android') { await getPermission() };
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          setIsJoined(true);
        },
        onUserJoined: (_connection) => {
          setRemoteUid(prevUids => [...prevUids, uid]);
        },
        onUserOffline: (_connection) => {
          setRemoteUid(prevUids => prevUids.filter(id => id !== uid));
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={Styles.main}>
      <ScrollView style={Styles.scroll} contentContainerStyle={Styles.scrollContainer}>
        {isJoined && isHost ? (
          <React.Fragment key={uid}>
            <RtcSurfaceView canvas={{ uid:0}} style={Styles.videoView} />
            <View style={Styles.userContainer}>
              <Text style={Styles.userTextName}>{channelName}</Text>
              <Text style={Styles.userText}>Users: {remoteUid.length}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={handleLike}>
                <Image
                  style={liked ? [Styles.imageLike,{tintColor:'red'}]:Styles.imageLike}
                  source={ require('../assests/picture/like.png')}
                />

              </TouchableOpacity>
              <Text style={Styles.likeCount}>{likeCount}</Text>
              <TouchableOpacity onPress={handleDislike}>
                <Image
                  style={disliked ? [Styles.imageDislike,{tintColor:'red'}]:Styles.imageDislike}
                  source={require('../assests/picture/dislikee.png')}
                />
              </TouchableOpacity>
              <Text style={Styles.dislikeCount}>{dislikeCount}</Text>
            </View>
          </React.Fragment>
        ) : (
          <Text style={Styles.headerText}>{isHost ? 'Bir kanala katıl' : ''}</Text>
        )}
        {remoteUid.map(uid => (
          <React.Fragment key={uid}>
            <RtcSurfaceView canvas={{ uid }} style={Styles.videoView} />
            <Text>Remote user uid: {uid}</Text>
          </React.Fragment>
        ))}
        <View style={Styles.container}>
          <View style={Styles.btnContainer}>
            <TouchableOpacity onPress={join} style={Styles.button}>
              <Text style={Styles.buttonText}>Katıl</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={leave} style={Styles.button}>
              <Text style={Styles.buttonText}>Ayrıl</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;