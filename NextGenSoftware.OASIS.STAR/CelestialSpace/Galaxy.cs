﻿using System;
using System.Collections.Generic;
using NextGenSoftware.OASIS.API.Core.Enums;
using NextGenSoftware.OASIS.API.Core.Interfaces.STAR;
using NextGenSoftware.OASIS.STAR.CelestialBodies;

namespace NextGenSoftware.OASIS.STAR.CelestialSpace
{
    public class Galaxy : CelestialSpace, IGalaxy
    {
        public ISuperStar SuperStar { get; set; } = new SuperStar() { CreatedOASISType = new API.Core.Helpers.EnumValue<API.Core.Enums.OASISType>(API.Core.Enums.OASISType.STARCLI) };
        public List<ISolarSystem> SolarSystems { get; set; } = new List<ISolarSystem>();
        public List<INebula> Nebulas { get; set; } = new List<INebula>();
        public List<IStar> Stars { get; set; } = new List<IStar>();
        public List<IPlanet> Planets { get; set; } = new List<IPlanet>();
        public List<IAsteroid> Asteroids { get; set; } = new List<IAsteroid>();
        public List<IComet> Comets { get; set; } = new List<IComet>();
        public List<IMeteroid> Meteroids { get; set; } = new List<IMeteroid>();

        public Galaxy() : base(HolonType.Galaxy) { }

        public Galaxy(Guid id, bool autoLoad = true) : base(id, HolonType.Galaxy, autoLoad) { }

        //public Galaxy(Dictionary<ProviderType, string> providerKey) : base(providerKey, HolonType.Galaxy) { }
        public Galaxy(string providerKey, ProviderType providerType, bool autoLoad = true) : base(providerKey, providerType, HolonType.CosmicWave, autoLoad) { }
    }
}