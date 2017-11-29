using System;
namespace EventHubWebSocket.Models
{
    public class DataEvent
    {
        public DataEvent()
        {

        }

        public double ActiveGelBreaker { get; set; }
        public double Annulus { get; set; }
        public double BackupTreatingPressure { get; set; }
        public double BaseViscosity { get; set; }
        public double Biocide { get; set; }
        public double BlenderPropConc { get; set; }
        public double BlenderPropTotal { get; set; }
        public double BottomHolePressure { get; set; }
        public double CalcBHPropConc { get; set; }
        public double ClayStabilizer { get; set; }
        public double CleanRate { get; set; }
        public double CleanTotal { get; set; }
        public double DelayedCrosslinker { get; set; }
        public double DelayedGelBreaker { get; set; }
        public double ElapsedTime { get; set; }
        public double FRBreaker { get; set; }
        public double FrictionReducer { get; set; }
        public double GellingAgent { get; set; }
        public double HHP { get; set; }
        public double HighpHBuffer { get; set; }
        public double HydrostaticPressure { get; set; }
        public double InlinePropConc { get; set; }
        public double IronControlConcentration { get; set; }
        public double JobTime { get; set; }
        public double LowpHBuffer { get; set; }
        public double OxygenScavengerConcentration { get; set; }
        public double PropConcTarget { get; set; }
        public double ScaleInhibitorConcentration { get; set; }
        public double SlurryDensity { get; set; }
        public double SlurryRate { get; set; }
        public double SlurryTotal { get; set; }
        public int StageAtBlender { get; set; }
        public double SurfaceCrosslinkerConcentration { get; set; }
        public double SurfactantConcentration { get; set; }
        public double TreatingPressure { get; set; }
        public double WellheadPressureImport { get; set; }
        public string Wellname { get; set; }
    }
}
