﻿using System;
using System.Collections.Generic;
using NextGenSoftware.OASIS.API.Core.Enums;
using NextGenSoftware.OASIS.API.Core.Interfaces.STAR;

namespace NextGenSoftware.OASIS.STAR.CelestialBodies
{
    // At the centre of the Omniverse... (there can only be ONE) ;-)
    public class GreatGrandSuperStar : Star, IGreatGrandSuperStar
    {
        //public GreatGrandSuperStar(Guid id) : base(id, HolonType.GreatGrandSuperStar){ }
        public GreatGrandSuperStar(Guid id) : base(id) { }

        //public GreatGrandSuperStar(Dictionary<ProviderType, string> providerKey) : base(providerKey, HolonType.GreatGrandSuperStar){}
        //public GreatGrandSuperStar(Dictionary<ProviderType, string> providerKey) : base(providerKey) { }
        public GreatGrandSuperStar(string providerKey, ProviderType providerType, bool autoLoad = true) : base(providerKey, providerType, autoLoad) { }

        public GreatGrandSuperStar() : base(HolonType.GreatGrandSuperStar){ }
    }
}