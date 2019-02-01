var speedLimit = 10.0;
var speedLimitRadius = 100.0;
var keyPress = 38; // E

var speedZones = []; // {FlareObject: id, FlareObjectPos: arr, ZoneId: id}
RequestModel("w_am_flare");
RequestWeaponAsset(1233104067, 31, 0);
setTick(() => {
	var playerCoord = GetEntityCoords(GetPlayerPed(-1), true);
	if (IsControlJustReleased(0, keyPress)) {
		var objectNear = GetClosestObjectOfType(playerCoord[0], playerCoord[1], playerCoord[2], 5.0, "w_am_flare", false, false, false);
		if (objectNear) {
			console.log("Finding Zone/Flare");
			var ObjectPos = GetEntityCoords(objectNear, true);
			var indexToRemove = -1;
			for(var i = 0; i < speedZones.length; i++) {
				console.log(speedZones[i].FlareObject == objectNear);
				if (speedZones[i].FlareObject == objectNear) {
					console.log("Remove Zone/Flare");
					DeleteObject(speedZones[i].FlareObject);
					N_0x1033371fc8e842a7(speedZones[i].ZoneId);
					indexToRemove = i;
				}
			}
			if (indexToRemove != -1) {
				speedZones.splice(indexToRemove, 1);
			} else {
				console.log("Flare not found. Removing anyway? (Walk away if still around. The world will clean it up)", objectNear);
				DeleteObject(objectNear);
			}
		} else {
			console.log("Create Zone/Flare");
			var flareObject = CreateWeaponObject(1233104067, 1, playerCoord[0], playerCoord[1], playerCoord[2], true, 0.0, false);
			PlaceObjectOnGroundProperly(flareObject);
			var flareObjectPos = GetEntityCoords(flareObject, true);
			var zoneId = N_0x2ce544c68fb812a0(flareObjectPos[0], flareObjectPos[1], flareObjectPos[2], speedLimitRadius, speedLimit, false);
			speedZones.push({FlareObject: flareObject, FlareObjectPos: flareObjectPos, ZoneId: zoneId});
			console.log( {FlareObject: flareObject, FlareObjectPos: flareObjectPos, ZoneId: zoneId} );
		}
	}
});