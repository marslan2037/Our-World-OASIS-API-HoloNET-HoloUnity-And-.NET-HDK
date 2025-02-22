using System.Net;
using System.Net.Http;
using NextGenSoftware.OASIS.API.Core.Helpers;
using NextGenSoftware.OASIS.API.Core.Enums;
using NextGenSoftware.OASIS.API.Core.Managers;

namespace NextGenSoftware.OASIS.API.ONODE.WebAPI.Helpers
{
    public class OASISHttpResponseMessage<T> : HttpResponseMessage
    {
       // private bool _showSettings = false;
        //private AutoFailOverMode _autoFailOverMode = AutoFailOverMode.NotSet;
        //private AutoReplicationMode _autoReplicationMode = AutoReplicationMode.NotSet;
        //private AutoLoadBalanceMode _autoLoadBalanceMode = AutoLoadBalanceMode.NotSet;

        public bool ShowDetailedSettings { get; set; }

        public OASISResult<T> Result { get; set; }
        public string OASISVersion
        {
            get
            {
                switch (OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.OASISVersion.ToUpper())
                {
                    case "LIVE":
                        return string.Concat(OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.CurrentLiveVersion, " ", OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.OASISVersion.ToUpper());

                    case "STAGING":
                        return string.Concat(OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.CurrentStagingVersion, " ", OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.OASISVersion.ToUpper());

                    default:
                        return string.Concat(OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.CurrentLiveVersion, " ", OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.OASISVersion.ToUpper());
                }
            }
        }

        public bool? AutoLoadBalanceEnabled
        {
            get
            {
                return ProviderManager.IsAutoLoadBalanceEnabled;

                //if (_autoLoadBalanceMode == AutoLoadBalanceMode.NotSet || _autoLoadBalanceMode == AutoLoadBalanceMode.UseGlobalDefaultInOASISDNA)
                //    return OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.StorageProviders.AutoLoadBalanceEnabled;
                //else
                //    return _autoLoadBalanceMode == AutoLoadBalanceMode.True;
            }
        }

        public bool? AutoFailOverEnabled
        {
            get
            {
                return ProviderManager.IsAutoFailOverEnabled;

                //if (_autoFailOverMode == AutoFailOverMode.NotSet || _autoFailOverMode == AutoFailOverMode.UseGlobalDefaultInOASISDNA)
                //    return OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.StorageProviders.AutoFailOverEnabled;
                //else
                //    return _autoFailOverMode == AutoFailOverMode.True;
            }
        }

        public bool? AutoReplicationEnabled
        {
            get
            {
                return ProviderManager.IsAutoReplicationEnabled;

                //if (_autoReplicationMode == AutoReplicationMode.NotSet || _autoReplicationMode == AutoReplicationMode.UseGlobalDefaultInOASISDNA)
                //    return OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.StorageProviders.AutoReplicationEnabled;
                //else
                //    return _autoReplicationMode == AutoReplicationMode.True;
            }
        }

        public string AutoLoadBalanceProviders
        {
            get
            {
                if (ShowDetailedSettings)
                    return ProviderManager.GetProviderAutoLoadBalanceListAsString();
                //return OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.StorageProviders.AutoLoadBalanceProviders;
                else
                    return null;
            }
        }

        public string AutoFailOverProviders
        {
            get
            {
                if (ShowDetailedSettings)
                    return ProviderManager.GetProviderAutoFailOverListAsString();
                        //return OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.StorageProviders.AutoFailOverProviders;
                else
                    return null;
            }
        }

        public string AutoReplicationProviders
        {
            get
            {
                if (ShowDetailedSettings)
                    return ProviderManager.GetProvidersThatAreAutoReplicatingAsString();
                    //return OASISBootLoader.OASISBootLoader.OASISDNA.OASIS.StorageProviders.AutoReplicationProviders;
                else
                    return null;
            }
        }

        public string CurrentOASISProvider
        {
            get
            {
                return Core.Managers.ProviderManager.CurrentStorageProviderType.Name;
            }
        }

        //public OASISHttpResponseMessage(OASISResult<T> result, bool showDetailedSettings = false, AutoFailOverMode autoFailOverMode = AutoFailOverMode.NotSet, AutoReplicationMode autoReplicationMode = AutoReplicationMode.NotSet, AutoLoadBalanceMode autoLoadBalanceMode = AutoLoadBalanceMode.NotSet) : base() 
        //{
        //    _showSettings = showDetailedSettings;
        //    _autoFailOverMode = autoFailOverMode;
        //    _autoReplicationMode = autoReplicationMode;
        //    _autoLoadBalanceMode = autoLoadBalanceMode;
        //    Result = result;
        //}

        //public OASISHttpResponseMessage(bool showDetailedSettings = false, AutoFailOverMode autoFailOverMode = AutoFailOverMode.NotSet, AutoReplicationMode autoReplicationMode = AutoReplicationMode.NotSet, AutoLoadBalanceMode autoLoadBalanceMode = AutoLoadBalanceMode.NotSet) : base()
        //{
        //    _showSettings = showDetailedSettings;
        //    _autoFailOverMode = autoFailOverMode;
        //    _autoReplicationMode = autoReplicationMode;
        //    _autoLoadBalanceMode = autoLoadBalanceMode;
        //}

        //public OASISHttpResponseMessage(HttpStatusCode statusCode, bool showDetailedSettings = false, AutoFailOverMode autoFailOverMode = AutoFailOverMode.NotSet, AutoReplicationMode autoReplicationMode = AutoReplicationMode.NotSet, AutoLoadBalanceMode autoLoadBalanceMode = AutoLoadBalanceMode.NotSet) : base(statusCode)
        //{
        //    _showSettings = showDetailedSettings;
        //    _autoFailOverMode = autoFailOverMode;
        //    _autoReplicationMode = autoReplicationMode;
        //    _autoLoadBalanceMode = autoLoadBalanceMode;
        //}

        //public OASISHttpResponseMessage(OASISResult<T> result, HttpStatusCode statusCode, bool showDetailedSettings = false, AutoFailOverMode autoFailOverMode = AutoFailOverMode.NotSet, AutoReplicationMode autoReplicationMode = AutoReplicationMode.NotSet, AutoLoadBalanceMode autoLoadBalanceMode = AutoLoadBalanceMode.NotSet) : base(statusCode) 
        //{
        //    _showSettings = showDetailedSettings;
        //    _autoFailOverMode = autoFailOverMode;
        //    _autoReplicationMode = autoReplicationMode;
        //    _autoLoadBalanceMode = autoLoadBalanceMode;
        //    Result = result;
        //}

        public OASISHttpResponseMessage(OASISResult<T> result, bool showDetailedSettings = false) : base()
        {
            ShowDetailedSettings = showDetailedSettings;
            Result = result;
        }

        public OASISHttpResponseMessage(bool showDetailedSettings = false) : base()
        {
            ShowDetailedSettings = showDetailedSettings;
        }

        public OASISHttpResponseMessage(HttpStatusCode statusCode, bool showDetailedSettings = false) : base(statusCode)
        {
            ShowDetailedSettings = showDetailedSettings;
        }

        public OASISHttpResponseMessage(OASISResult<T> result, HttpStatusCode statusCode, bool showDetailedSettings = false) : base(statusCode)
        {
            ShowDetailedSettings = showDetailedSettings;
            Result = result;
        }
    }
}