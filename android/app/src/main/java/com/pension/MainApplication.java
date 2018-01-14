package com.pension;

import android.app.Application;
import android.view.WindowManager;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.zphhhhh.speech.SpeechPackage;
import com.beefe.picker.PickerViewPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.react.arron.speech.speechModulePackage;
import com.github.yamill.orientation.OrientationPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.pension.commontools.RCTCommonToolsPackage;
import com.pilloxa.backgroundjob.BackgroundJobPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new ReactNativePushNotificationPackage(),
            new RNDeviceInfo(),
            new OrientationPackage(),
            new PickerViewPackage(),
            new speechModulePackage(),
            new SpeechPackage(),
            new BackgroundJobPackage(),
            new SplashScreenReactPackage(),
            new RCTCommonToolsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

  }
}
