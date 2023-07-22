import { Vector3 } from "@fivemjs/shared";
//@ts-ignore
const Citizen = global.Citizen;
//@ts-ignore
const msgpack_pack = global.msgpack_pack;
const _i = Citizen.pointerValueInt();
const _f = Citizen.pointerValueFloat();
const _v = Citizen.pointerValueVector();
const _r = Citizen.returnResultAnyway();
const _ri = Citizen.resultAsInteger();
const _rf = Citizen.resultAsFloat();
const _rl = Citizen.resultAsLong();
const _s = Citizen.resultAsString();
const _rv = Citizen.resultAsVector();
//@ts-ignore
const _ro = Citizen.resultAsObject2();
//@ts-ignore
const _in = Citizen.invokeNativeByHash;
const _ii = Citizen.pointerValueIntInitialized;
const _fi = Citizen.pointerValueFloatInitialized;
function joaat(key: string) {
	var hash = 0,
		i = key.length;

	while (i--) {
		hash += key.charCodeAt(i);
		hash += hash << 10;
		hash ^= hash >> 6;
	}
	hash += hash << 3;
	hash ^= hash >> 11;
	hash += hash << 15;
	return hash;
}
function _ch(hash: any) {
	if (typeof hash === "string") {
		return joaat(hash);
	}

	return hash;
}

function _obj(obj: any) {
	const s = msgpack_pack(obj);
	return [s, s.length];
}

function _ts(num: any) {
	if (num === 0 || num === null || num === undefined || num === false) {
		// workaround for users calling string parameters with '0', also nil being translated
		return null;
	}
	if (ArrayBuffer.isView(num) || num instanceof ArrayBuffer) {
		// these are handled as strings internally
		return num;
	}
	return num.toString();
}
function _fv(flt: number) {
	return flt === 0.0 ? flt : flt + 0.0000001;
}

function _mfr(fn: any) {
	return Citizen.makeRefFunction(fn);
}

/**
 * Loads a minimap overlay from a GFx file in the current resource.
 * @param name
 * @return A minimap overlay ID.
 */
export function addMinimapOverlay(name: string): number {
	return _in(0x00000000, 0x4afd2499, name, _r, _ri); 
}

/**
 * Adds an output for the specified audio submix.
 * @param submixId
 * @param outputSubmixId
 */
export function addAudioSubmixOutput(submixId: number, outputSubmixId: number): void {
	return _in(0x00000000, 0xac6e290d, submixId, outputSubmixId); 
}

/**
 * Experimental natives, please do not use in a live environment.
 * @param origTxd
 * @param origTxn
 * @param newTxd
 * @param newTxn
 */
export function addReplaceTexture(origTxd: string, origTxn: string, newTxd: string, newTxn: string): void {
	return _in(0x00000000, 0xa66f8f75, origTxd, origTxn, newTxd, newTxn); 
}

/**
 * 
 * @param entryKey
 * @param entryText
 */
export function addTextEntry(entryKey: string, entryText: string): void {
	return _in(0x00000000, 0x32ca01c3, entryKey, entryText); 
}

/**
 * 
 * @param entryKey
 * @param entryText
 */
export function addTextEntryByHash(entryKey: number, entryText: string): void {
	return _in(0x00000000, 0x289da860, entryKey, entryText); 
}

/**
 * This is similar to the PushScaleformMovieFunction natives, except it calls in the `TIMELINE` of a minimap overlay.
 * @param miniMap
 * @param fnName
 */
export function callMinimapScaleformFunction(miniMap: number, fnName: string): boolean {
	return _in(0x00000000, 0x4c89c0ed, miniMap, fnName, _r, _ri); 
}

/**
 * Adds a handler for changes to a state bag.
 * 
 * The function called expects to match the following signature:
 * 
 * ```ts
 * function StateBagChangeHandler(bagName: string, key: string, value: any, reserved: number, replicated: boolean);
 * ```
 * 
 * *   **bagName**: The internal bag ID for the state bag which changed. This is usually `player:Source`, `entity:NetID`
 * or `localEntity:Handle`.
 * *   **key**: The changed key.
 * *   **value**: The new value stored at key. The old value is still stored in the state bag at the time this callback executes.
 * *   **reserved**: Currently unused.
 * *   **replicated**: Whether the set is meant to be replicated.
 * 
 * At this time, the change handler can't opt to reject changes.
 * 
 * If bagName refers to an entity, use [GET_ENTITY_FROM_STATE_BAG_NAME](?\_0x4BDF1868) to get the entity handle
 * If bagName refers to a player, use [GET_PLAYER_FROM_STATE_BAG_NAME](?\_0xA56135E0) to get the player handle
 * @param keyFilter
 * @param bagFilter
 * @param handler
 * @return A cookie to remove the change handler.
 */
export function addStateBagChangeHandler(keyFilter: string, bagFilter: string, handler: number): number {
	return _in(0x00000000, 0x5ba35aaf, keyFilter, bagFilter, handler, _r, _ri); 
}

/**
 * Cancels the currently executing event.
 */
export function cancelEvent(): void {
	return _in(0x00000000, 0xfa29d35d); 
}

/**
 * Returns whether or not the specified player has enough information to start a commerce session for.
 * @param playerSrc
 * @return True or false.
 */
export function canPlayerStartCommerceSession(playerSrc: string): boolean {
	return _in(0x00000000, 0x429461c3, playerSrc, _r, _ri); 
}

/**
 * 
 * @param enabled
 */
export function enableEnhancedHostSupport(enabled: boolean): void {
	return _in(0x00000000, 0xf97b1c93, enabled); 
}

/**
 * 
 * @param referenceIdentity
 */
export function duplicateFunctionReference(referenceIdentity: string): string {
	return _in(0x00000000, 0xf4e2079d, referenceIdentity, _r, _s); 
}

/**
 * Removes vehicle xenon lights custom RGB color.
 * @param vehicle
 */
export function clearVehicleXenonLightsCustomColor(vehicle: number): void {
	return _in(0x00000000, 0x2867ed8c, vehicle); 
}

/**
 * 
 * @param playerSrc
 * @param reason
 */
export function dropPlayer(playerSrc: string, reason: string): void {
	return _in(0x00000000, 0xba0613e1, playerSrc, reason); 
}

/**
 * Commits the backing pixels to the specified runtime texture.
 * @param tex
 */
export function commitRuntimeTexture(tex: number): void {
	return _in(0x00000000, 0x19d81f4e, tex); 
}

/**
 * 
 * @param findHandle
 */
export function endFindPed(findHandle: number): void {
	return _in(0x00000000, 0x9615c2ad, findHandle); 
}

/**
 * Creates a volume where water effects do not apply.
 * Useful for preventing water collisions from flooding areas underneath them.
 * This has no effect on waterquads, only water created from drawables and collisions.
 * Don't create volumes when your local ped is swimming (e.g. use IS_PED_SWIMMING in your scripts before you call this)
 * @param xMin
 * @param yMin
 * @param zMin
 * @param xMax
 * @param yMax
 * @param zMax
 */
export function createDryVolume(xMin: number, yMin: number, zMin: number, xMax: number, yMax: number, zMax: number): number {
	return _in(0x00000000, 0x0eb1c6dd, xMin, yMin, zMin, xMax, yMax, zMax, _r, _ri); 
}

/**
 * 
 * @param findHandle
 */
export function endFindPickup(findHandle: number): void {
	return _in(0x00000000, 0x3c407d53, findHandle); 
}

/**
 * 
 * @param findHandle
 */
export function endFindObject(findHandle: number): void {
	return _in(0x00000000, 0xdeda4e50, findHandle); 
}

/**
 * Creates a blank runtime texture.
 * @param txd
 * @param txn
 * @param width
 * @param height
 * @return A runtime texture handle.
 */
export function createRuntimeTexture(txd: number, txn: string, width: number, height: number): number {
	return _in(0x00000000, 0xfec3766d, txd, txn, width, height, _r, _rl); 
}

/**
 * 
 * @param findHandle
 */
export function endFindVehicle(findHandle: number): void {
	return _in(0x00000000, 0x9227415a, findHandle); 
}

/**
 * 
 * @param handle
 * @return None.
 */
export function endFindKvp(handle: number): void {
	return _in(0x00000000, 0xb3210203, handle); 
}

/**
 * A getter for [SET_AMBIENT_VEHICLE_RANGE_MULTIPLIER_THIS_FRAME](#\_0x90B6DA738A9A25DA).
 * @return Returns ambient vehicle range multiplier value.
 */
export function getAmbientVehicleRangeMultiplier(): number {
	return _in(0x00000000, 0x667ec929, _r, _rf); 
}

/**
 * Internal function for ensuring an entity has a state bag.
 * @param entity
 */
export function ensureEntityStateBag(entity: number): void {
	return _in(0x00000000, 0x3bb78f05, entity); 
}

/**
 * Creates an audio submix with the specified name, or gets the existing audio submix by that name.
 * @param name
 * @return A submix ID, or -1 if the submix could not be created.
 */
export function createAudioSubmix(name: string): number {
	return _in(0x00000000, 0x658d2bc8, name, _r, _ri); 
}

/**
 * Creates a runtime texture from a DUI handle.
 * @param txd
 * @param txn
 * @param duiHandle
 * @return The runtime texture handle.
 */
export function createRuntimeTextureFromDuiHandle(txd: number, txn: string, duiHandle: string): number {
	return _in(0x00000000, 0xb135472b, txd, txn, duiHandle, _r, _rl); 
}

/**
 * Creates a runtime texture dictionary with the specified name.
 * Example:
 * 
 * ```lua
 * local txd = CreateRuntimeTxd('meow')
 * ```
 * @param name
 * @return A handle to the runtime TXD.
 */
export function createRuntimeTxd(name: string): number {
	return _in(0x00000000, 0x1f3ac778, name, _r, _rl); 
}

/**
 * Creates a DUI browser. This can be used to draw on a runtime texture using CREATE_RUNTIME_TEXTURE_FROM_DUI_HANDLE.
 * @param url
 * @param width
 * @param height
 * @return A DUI object.
 */
export function createDui(url: string, width: number, height: number): number {
	return _in(0x00000000, 0x23eaf899, url, width, height, _r, _rl); 
}

/**
 * Deletes the specified entity.
 * @param entity
 */
export function deleteEntity(entity: number): void {
	return _in(0x00000000, 0xfaa3d236, entity); 
}

/**
 * Returns all vehicle handles known to the server.
 * The data returned adheres to the following layout:
 * 
 * ```
 * [127, 42, 13, 37]
 * ```
 * @return An object containing a list of vehicle handles.
 */
export function getAllVehicles(): number {
	return _in(0x00000000, 0x332169f5, _r, _ro); 
}

/**
 * 
 * @param commandString
 */
export function executeCommand(commandString: string): void {
	return _in(0x00000000, 0x561c060b, commandString); 
}

/**
 * A getter for [SET_AMBIENT_PED_RANGE_MULTIPLIER_THIS_FRAME](#\_0x0B919E1FB47CC4E0).
 * @return Returns ambient ped range multiplier value.
 */
export function getAmbientPedRangeMultiplier(): number {
	return _in(0x00000000, 0xb550232d, _r, _rf); 
}

/**
 * Creates a runtime texture from the specified file in the current resource or a base64 data URL.
 * @param txd
 * @param txn
 * @param fileName
 * @return A runtime texture handle.
 */
export function createRuntimeTextureFromImage(txd: number, txn: string, fileName: string): number {
	return _in(0x00000000, 0x786d8bc3, txd, txn, fileName, _r, _rl); 
}

/**
 * Nonsynchronous [DELETE_RESOURCE_KVP](#\_0x7389B5DF) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key
 */
export function deleteResourceKvpNoSync(key: string): void {
	return _in(0x00000000, 0x04152c90, key); 
}

/**
 * Disables the game's afk camera that starts panning around after 30 seconds of inactivity.
 * @param state
 */
export function disableIdleCamera(state: boolean): void {
	return _in(0x00000000, 0x3d5ab7f0, state); 
}

/**
 * Can be used to get a console variable of type `char*`, for example a string.
 * @param varName
 * @param default_
 * @return Returns the convar value if it can be found, otherwise it returns the assigned `default`.
 */
export function getConvar(varName: string, default_: string): string {
	return _in(0x00000000, 0x6ccd2564, varName, default_, _r, _s); 
}

/**
 * This native is not implemented.
 * @param data
 * @param objectId
 * @param tree
 */
export function experimentalLoadCloneCreate(data: string, objectId: number, tree: string): number {
	return _in(0x00000000, 0xd2cb95a3, data, objectId, tree, _r, _ri); 
}

/**
 * 
 * @param referenceIdentity
 */
export function deleteFunctionReference(referenceIdentity: string): void {
	return _in(0x00000000, 0x1e86f206, referenceIdentity); 
}

/**
 * 
 * @param key
 */
export function deleteResourceKvp(key: string): void {
	return _in(0x00000000, 0x7389b5df, key); 
}

/**
 * This native is not implemented.
 * @param entity
 */
export function experimentalSaveCloneCreate(entity: number): string {
	return _in(0x00000000, 0x9d65cad2, entity, _r, _s); 
}

/**
 * Destroys a DUI browser.
 * @param duiObject
 */
export function destroyDui(duiObject: number): void {
	return _in(0x00000000, 0xa085cb10, duiObject); 
}

/**
 * 
 * @param entity
 */
export function doesEntityExist(entity: number): boolean {
	return _in(0x00000000, 0x3ac90869, entity, _r, _ri); 
}

/**
 * Disables the game's world horizon lods rendering (see `farlods.#dd`).
 * Using the island hopper natives might also affect this state.
 * @param state
 */
export function disableWorldhorizonRendering(state: boolean): void {
	return _in(0x00000000, 0xa9c92cdc, state); 
}

/**
 * This native returns the currently used game's name.
 * @return The game name as a string, one of the following values: gta4, gta5, rdr3
 */
export function getCurrentGameName(): string {
	return _in(0x00000000, 0xaca18ecd, _r, _s); 
}

/**
 * Can be used to get a console variable casted back to `int` (an integer value).
 * @param varName
 * @param default_
 * @return Returns the convar value if it can be found, otherwise it returns the assigned `default`.
 */
export function getConvarInt(varName: string, default_: number): number {
	return _in(0x00000000, 0x935c0ab2, varName, default_, _r, _ri); 
}

/**
 * 
 * @param outEntity
 */
export function findFirstObject(outEntity: number): number {
	return _in(0x00000000, 0xfaa6cb5d, outEntity, _r, _ri); 
}

/**
 * Returns the world matrix of the specified camera. To turn this into a view matrix, calculate the inverse.
 * @param camera
 * @param rightVector
 * @param forwardVector
 * @param upVector
 * @param position
 */
export function getCamMatrix(camera: number, rightVector: Vector3, forwardVector: Vector3, upVector: Vector3, position: Vector3): void {
	return _in(0x00000000, 0x8f57a89d, camera, rightVector, forwardVector, upVector, position); 
}

/**
 * 
 */
export function getHostId(): string {
	return _in(0x00000000, 0x5f70f5a3, _r, _s); 
}

/**
 * This native is not implemented.
 * @param entity
 * @param data
 */
export function experimentalLoadCloneSync(entity: number, data: string): void {
	return _in(0x00000000, 0x6bc189ac, entity, data); 
}

/**
 * Returns the name of the currently executing resource.
 * @return The name of the resource.
 */
export function getCurrentResourceName(): string {
	return _in(0x00000000, 0xe5e9ebbb, _r, _s); 
}

/**
 * This native is not implemented.
 * @param entity
 */
export function experimentalSaveCloneSync(entity: number): string {
	return _in(0x00000000, 0x38d19210, entity, _r, _s); 
}

/**
 * 
 * @param outEntity
 */
export function findFirstPickup(outEntity: number): number {
	return _in(0x00000000, 0x3ff9d340, outEntity, _r, _ri); 
}

/**
 * 
 * @return The number of doors registered in the system
 */
export function doorSystemGetSize(): number {
	return _in(0x00000000, 0x237613b3, _r, _ri); 
}

/**
 * 
 * @param handle
 * @return None.
 */
export function findKvp(handle: number): string {
	return _in(0x00000000, 0xbd7bebc5, handle, _r, _s); 
}

/**
 * 
 * @param vehicle
 * @return See the client-side [GET_HELI_MAIN_ROTOR_HEALTH](https://docs.fivem.net/natives/?\_0xE4CB7541F413D2C5) for the return value.
 */
export function getHeliMainRotorHealth(vehicle: number): number {
	return _in(0x00000000, 0xf01e2aab, vehicle, _r, _rf); 
}

/**
 * Returns the current console output buffer.
 * @return The most recent game console output, as a string.
 */
export function getConsoleBuffer(): string {
	return _in(0x00000000, 0xe57429fa, _r, _s); 
}

/**
 * 
 * @param outEntity
 */
export function findFirstPed(outEntity: number): number {
	return _in(0x00000000, 0xfb012961, outEntity, _r, _ri); 
}

/**
 * Returns a list of door system entries: a door system hash (see [ADD_DOOR_TO_SYSTEM](#\_0x6F8838D03D1DC226)) and its object handle.
 * 
 * The data returned adheres to the following layout:
 * 
 * ```
 * [{doorHash1, doorHandle1}, ..., {doorHashN, doorHandleN}]
 * ```
 * @return An object containing a list of door system entries.
 */
export function doorSystemGetActive(): number {
	return _in(0x00000000, 0xf65bba4b, _r, _ro); 
}

/**
 * Requests whether or not the player owns the specified package.
 * @param playerSrc
 * @param skuId
 * @return A boolean.
 */
export function doesPlayerOwnSkuExt(playerSrc: string, skuId: number): boolean {
	return _in(0x00000000, 0xdef0480b, playerSrc, skuId, _r, _ri); 
}

/**
 * Like DRAW_RECT, but it's a line.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param width
 * @param r
 * @param g
 * @param b
 * @param a
 */
export function drawLine2d(x1: number, y1: number, x2: number, y2: number, width: number, r: number, g: number, b: number, a: number): void {
	return _in(0x00000000, 0x0b856a90, x1, y1, x2, y2, width, r, g, b, a); 
}

/**
 * 
 * @param outEntity
 */
export function findFirstVehicle(outEntity: number): number {
	return _in(0x00000000, 0x15e55694, outEntity, _r, _ri); 
}

/**
 * Returns the peer address of the remote game server that the user is currently connected to.
 * @return The peer address of the game server (e.g. `127.0.0.1:30120`), or NULL if not available.
 */
export function getCurrentServerEndpoint(): string {
	return _in(0x00000000, 0xea11bfba, _r, _s); 
}

/**
 * DRAW_RECT, but with a rotation. Seems to be broken.
 * @param x
 * @param y
 * @param width
 * @param height
 * @param rotation
 * @param r
 * @param g
 * @param b
 * @param a
 */
export function drawRectRotated(x: number, y: number, width: number, height: number, rotation: number, r: number, g: number, b: number, a: number): void {
	return _in(0x00000000, 0xec37c168, x, y, width, height, rotation, r, g, b, a); 
}

/**
 * 
 * @param vehicle
 * @return See the client-side [GET_HELI_TAIL_ROTOR_HEALTH](https://docs.fivem.net/natives/?\_0xAE8CE82A4219AC8C) for the return value.
 */
export function getHeliTailRotorHealth(vehicle: number): number {
	return _in(0x00000000, 0xa41bc13d, vehicle, _r, _rf); 
}

/**
 * Requests whether or not the player owns the specified SKU.
 * @param playerSrc
 * @param skuId
 * @return A boolean.
 */
export function doesPlayerOwnSku(playerSrc: string, skuId: number): boolean {
	return _in(0x00000000, 0x167aba27, playerSrc, skuId, _r, _ri); 
}

/**
 * 
 * @param private_
 */
export function flagServerAsPrivate(private_: boolean): void {
	return _in(0x00000000, 0x13b6855d, private_); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @param cornerIndex
 * @param posX
 * @param posY
 * @param posZ
 * @return Portal corner position.
 */
export function getInteriorPortalCornerPosition(interiorId: number, portalIndex: number, cornerIndex: number, posX: number, posY: number, posZ: number): void {
	return _in(0x00000000, 0xf772bb2c, interiorId, portalIndex, cornerIndex, posX, posY, posZ); 
}

/**
 * 
 * @param findHandle
 * @param outEntity
 */
export function findNextPickup(findHandle: number, outEntity: number): boolean {
	return _in(0x00000000, 0x4107ef0f, findHandle, outEntity, _r, _ri); 
}

/**
 * 
 * @param findHandle
 * @param outEntity
 */
export function findNextObject(findHandle: number, outEntity: number): boolean {
	return _in(0x00000000, 0x4e129dbf, findHandle, outEntity, _r, _ri); 
}

/**
 * Returns the NUI window handle for a specified DUI browser object.
 * @param duiObject
 * @return The NUI window handle, for use in e.g. CREATE_RUNTIME_TEXTURE_FROM_DUI_HANDLE.
 */
export function getDuiHandle(duiObject: number): string {
	return _in(0x00000000, 0x1655d41d, duiObject, _r, _s); 
}

/**
 * 
 * @param playerSrc
 */
export function getNumPlayerIdentifiers(playerSrc: string): number {
	return _in(0x00000000, 0xff7f66ab, playerSrc, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @return The amount of portals in interior.
 */
export function getInteriorPortalCount(interiorId: number): number {
	return _in(0x00000000, 0xd05bb8b1, interiorId, _r, _ri); 
}

/**
 * 
 * @param playerSrc
 */
export function getNumPlayerTokens(playerSrc: string): number {
	return _in(0x00000000, 0x619e4a3d, playerSrc, _r, _ri); 
}

/**
 * Returns all object handles known to the server.
 * The data returned adheres to the following layout:
 * 
 * ```
 * [127, 42, 13, 37]
 * ```
 * @return An object containing a list of object handles.
 */
export function getAllObjects(): number {
	return _in(0x00000000, 0x6886c3fe, _r, _ro); 
}

/**
 * Returns all peds handles known to the server.
 * The data returned adheres to the following layout:
 * 
 * ```
 * [127, 42, 13, 37]
 * ```
 * @return An object containing a list of peds handles.
 */
export function getAllPeds(): number {
	return _in(0x00000000, 0xb8584fef, _r, _ro); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @param entityIndex
 * @return Portal entity archetype.
 */
export function getInteriorPortalEntityArchetype(interiorId: number, portalIndex: number, entityIndex: number): number {
	return _in(0x00000000, 0x9a0e1700, interiorId, portalIndex, entityIndex, _r, _ri); 
}

/**
 * Returns the entity handle for the specified state bag name. For use with [ADD_STATE_BAG_CHANGE_HANDLER](?\_0x5BA35AAF).
 * @param bagName
 * @return The entity handle or 0 if the state bag name did not refer to an entity, or the entity does not exist.
 */
export function getEntityFromStateBagName(bagName: string): number {
	return _in(0x00000000, 0x4bdf1867, bagName, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @return Portal entity count.
 */
export function getInteriorPortalEntityCount(interiorId: number, portalIndex: number): number {
	return _in(0x00000000, 0x0c68021b, interiorId, portalIndex, _r, _ri); 
}

/**
 * 
 * @param playerSrc
 */
export function getAirDragMultiplierForPlayersVehicle(playerSrc: string): number {
	return _in(0x00000000, 0x62fc38d0, playerSrc, _r, _rf); 
}

/**
 * Forces the game snow pass to render.
 * @param enabled
 */
export function forceSnowPass(enabled: boolean): void {
	return _in(0x00000000, 0xe6e16170, enabled); 
}

/**
 * Returns all rope handles. The data returned adheres to the following layout:
 * 
 * ```
 * [ 770, 1026, 1282, 1538, 1794, 2050, 2306, 2562, 2818, 3074, 3330, 3586, 3842, 4098, 4354, 4610, ...]
 * ```
 * @return An object containing a list of all rope handles.
 */
export function getAllRopes(): number {
	return _in(0x00000000, 0x760a2d67, _r, _ro); 
}

/**
 * Currently it only works with peds.
 * @param entity
 */
export function getEntityMaxHealth(entity: number): number {
	return _in(0x00000000, 0xc7ae6aa1, entity, _r, _ri); 
}

/**
 * 
 */
export function getInstanceId(): number {
	return _in(0x00000000, 0x9f1c4383, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @param entityIndex
 * @return Portal entity flag.
 */
export function getInteriorPortalEntityFlag(interiorId: number, portalIndex: number, entityIndex: number): number {
	return _in(0x00000000, 0x9da2e811, interiorId, portalIndex, entityIndex, _r, _ri); 
}

/**
 * 
 * @param entity
 */
export function getEntityHeading(entity: number): number {
	return _in(0x00000000, 0x972cc383, entity, _r, _rf); 
}

/**
 * Currently it only works with peds.
 * @param entity
 */
export function getEntityHealth(entity: number): number {
	return _in(0x00000000, 0x8e3222b7, entity, _r, _ri); 
}

/**
 * Returns entity's archetype name, if available.
 * @param entity
 * @return Entity's archetype name
 */
export function getEntityArchetypeName(entity: number): string {
	return _in(0x00000000, 0x47b870f5, entity, _r, _s); 
}

/**
 * Gets the current coordinates for a specified entity. This native is used server side when using OneSync.
 * 
 * See [GET_ENTITY_COORDS](#\_0x3FEF770D40960D5A) for client side.
 * @param entity
 * @return The current entity coordinates.
 */
export function getEntityCoords(entity: number): Vector3 {
	return _in(0x00000000, 0x1647f1cb, entity, _r, _rv); 
}

/**
 * 
 * @param interiorId
 * @param bbMinX
 * @param bbMinY
 * @param bbMinZ
 * @param bbMaxX
 * @param bbMaxY
 * @param bbMaxZ
 * @return Interior entities extents.
 */
export function getInteriorEntitiesExtents(interiorId: number, bbMinX: number, bbMinY: number, bbMinZ: number, bbMaxX: number, bbMaxY: number, bbMaxZ: number): void {
	return _in(0x00000000, 0x322b1192, interiorId, bbMinX, bbMinY, bbMinZ, bbMaxX, bbMaxY, bbMaxZ); 
}

/**
 * Nonsynchronous operations will not wait for a disk/filesystem flush before returning from a write or delete call. They will be much faster than their synchronous counterparts (e.g., bulk operations), however, a system crash may lose the data to some recent operations.
 * 
 * This native ensures all `_NO_SYNC` operations are synchronized with the disk/filesystem.
 */
export function flushResourceKvp(): void {
	return _in(0x00000000, 0xe27c97a0); 
}

/**
 * Gets the entity that this entity is attached to.
 * @param entity
 * @return The attached entity handle. 0 returned if the entity is not attached.
 */
export function getEntityAttachedTo(entity: number): number {
	return _in(0x00000000, 0xfe1589f9, entity, _r, _ri); 
}

/**
 * 
 * @param findHandle
 * @param outEntity
 */
export function findNextVehicle(findHandle: number, outEntity: number): boolean {
	return _in(0x00000000, 0x8839120d, findHandle, outEntity, _r, _ri); 
}

/**
 * 
 * @param entity
 */
export function getEntityModel(entity: number): number {
	return _in(0x00000000, 0xdafcb3ec, entity, _r, _ri); 
}

/**
 * 
 * @param playerSrc
 */
export function getPlayerGuid(playerSrc: string): string {
	return _in(0x00000000, 0xe52d9680, playerSrc, _r, _s); 
}

/**
 * 
 * @param ped
 */
export function getPedCauseOfDeath(ped: number): number {
	return _in(0x00000000, 0x63458c27, ped, _r, _ri); 
}

/**
 * 
 * @param password
 */
export function getPasswordHash(password: string): string {
	return _in(0x00000000, 0x23473ea4, password, _r, _s); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @param entityIndex
 * @param posX
 * @param posY
 * @param posZ
 * @return Portal entity position.
 */
export function getInteriorPortalEntityPosition(interiorId: number, portalIndex: number, entityIndex: number, posX: number, posY: number, posZ: number): void {
	return _in(0x00000000, 0x9b7ab83c, interiorId, portalIndex, entityIndex, posX, posY, posZ); 
}

/**
 * 
 * @param entity
 */
export function getEntityRotationVelocity(entity: number): Vector3 {
	return _in(0x00000000, 0x9bf8a73f, entity, _r, _rv); 
}

/**
 * Get an identifier from a player by the type of the identifier.
 * @param playerSrc
 * @param identifierType
 * @return The identifier that matches the string provided
 */
export function getPlayerIdentifierByType(playerSrc: string, identifierType: string): string {
	return _in(0x00000000, 0xa61c8fc6, playerSrc, identifierType, _r, _s); 
}

/**
 * Returns a list of decorations applied to a ped.
 * 
 * The data returned adheres to the following layout:
 * 
 * ```
 * [ [ collectionHash1, overlayHash1 ], ..., [c ollectionHashN, overlayHashN ] ]
 * ```
 * 
 * This command will return undefined data if invoked on a remote player ped.
 * @param ped
 * @return An object containing a list of applied decorations.
 */
export function getPedDecorations(ped: number): number {
	return _in(0x00000000, 0x7cce1163, ped, _r, _ro); 
}

/**
 * A getter for [SET_PARKED_VEHICLE_DENSITY_MULTIPLIER_THIS_FRAME](#\_0xEAE6DCC7EEE3DB1D).
 * @return Returns parked vehicle density multiplier value.
 */
export function getParkedVehicleDensityMultiplier(): number {
	return _in(0x00000000, 0xff72df84, _r, _rf); 
}

/**
 * 
 * @param findHandle
 * @param outEntity
 */
export function findNextPed(findHandle: number, outEntity: number): boolean {
	return _in(0x00000000, 0xab09b548, findHandle, outEntity, _r, _ri); 
}

/**
 * Gets the current game timer in milliseconds.
 * @return The game time.
 */
export function getGameTimer(): number {
	return _in(0x00000000, 0xa4ea0691, _r, _rl); 
}

/**
 * 
 * @param ped
 */
export function getPedArmour(ped: number): number {
	return _in(0x00000000, 0x2ce311a7, ped, _r, _ri); 
}

/**
 * 
 * @param entity
 */
export function getEntityScript(entity: number): string {
	return _in(0x00000000, 0xb7f70784, entity, _r, _s); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @return Portal's room TO index.
 */
export function getInteriorPortalRoomTo(interiorId: number, portalIndex: number): number {
	return _in(0x00000000, 0x3f47f0e8, interiorId, portalIndex, _r, _ri); 
}

/**
 * Returns a list of entity handles (script GUID) for all entities in the specified pool - the data returned is an array as
 * follows:
 * 
 * ```json
 * [ 770, 1026, 1282, 1538, 1794, 2050, 2306, 2562, 2818, 3074, 3330, 3586, 3842, 4098, 4354, 4610, ...]
 * ```
 * 
 * ### Supported pools
 * 
 * *   `CPed`: Peds (including animals) and players.
 * *   `CObject`: Objects (props), doors, and projectiles.
 * *   `CVehicle`: Vehicles.
 * *   `CPickup`: Pickups.
 * @param poolName
 * @return An array containing entity handles for each entity in the named pool.
 */
export function getGamePool(poolName: string): number {
	return _in(0x00000000, 0x2b9d4f50, poolName, _r, _ro); 
}

/**
 * Returns all player indices for 'active' physical players known to the client.
 * The data returned adheres to the following layout:
 * 
 * ```
 * [127, 42, 13, 37]
 * ```
 * @return An object containing a list of player indices.
 */
export function getActivePlayers(): number {
	return _in(0x00000000, 0xcf143fb9, _r, _ro); 
}

/**
 * Returns the current game being executed.
 * 
 * Possible values:
 * 
 * | Return value | Meaning                        |
 * | ------------ | ------------------------------ |
 * | `fxserver`   | Server-side code ('Duplicity') |
 * | `fivem`      | FiveM for GTA V                |
 * | `libertym`   | LibertyM for GTA IV            |
 * | `redm`       | RedM for Red Dead Redemption 2 |
 * @return The game the script environment is running in.
 */
export function getGameName(): string {
	return _in(0x00000000, 0xe8eaa18b, _r, _s); 
}

/**
 * Gets the amount of metadata values with the specified key existing in the specified resource's manifest.
 * See also: [Resource manifest](https://docs.fivem.net/resources/manifest/)
 * @param resourceName
 * @param metadataKey
 */
export function getNumResourceMetadata(resourceName: string, metadataKey: string): number {
	return _in(0x00000000, 0x0776e864, resourceName, metadataKey, _r, _ri); 
}

/**
 * 
 */
export function getNumPlayerIndices(): number {
	return _in(0x00000000, 0x63d13184, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @return Portal's room FROM index.
 */
export function getInteriorPortalRoomFrom(interiorId: number, portalIndex: number): number {
	return _in(0x00000000, 0xaa9c141d, interiorId, portalIndex, _r, _ri); 
}

/**
 * Returns the internal build number of the current game being executed.
 * 
 * Possible values:
 * 
 * *   FiveM
 * *   1604
 * *   2060
 * *   2189
 * *   2372
 * *   2545
 * *   2612
 * *   2699
 * *   2802
 * *   RedM
 * *   1311
 * *   1355
 * *   1436
 * *   1491
 * *   LibertyM
 * *   43
 * *   FXServer
 * *   0
 * @return The build number, or **0** if no build number is known.
 */
export function getGameBuildNumber(): number {
	return _in(0x00000000, 0x804b9f7b, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @param posX
 * @param posY
 * @param posZ
 * @return Interior position.
 */
export function getInteriorPosition(interiorId: number, posX: number, posY: number, posZ: number): void {
	return _in(0x00000000, 0x77a435b0, interiorId, posX, posY, posZ); 
}

/**
 * Returns all registered vehicle model names, including non-dlc vehicles and custom vehicles in no particular order.
 * 
 * **Example output**
 * 
 * ```
 * ["dubsta", "dubsta2", "dubsta3", "myverycoolcar", "sultan", "sultanrs", ...]
 * ```
 * 
 * This native will not return vehicles that are unregistered (i.e from a resource being stopped) during runtime.
 */
export function getAllVehicleModels(): number {
	return _in(0x00000000, 0xd7531645, _r, _ro); 
}

/**
 * 
 * @param interiorId
 * @param roomIndex
 * @param bbMinX
 * @param bbMinY
 * @param bbMinZ
 * @param bbMaxX
 * @param bbMaxY
 * @param bbMaxZ
 * @return Room extents.
 */
export function getInteriorRoomExtents(interiorId: number, roomIndex: number, bbMinX: number, bbMinY: number, bbMinZ: number, bbMaxX: number, bbMaxY: number, bbMaxZ: number): void {
	return _in(0x00000000, 0xf9e795dd, interiorId, roomIndex, bbMinX, bbMinY, bbMinZ, bbMaxX, bbMaxY, bbMaxZ); 
}

/**
 * This native gets an entity's population type.
 * @param entity
 * @return Returns the population type ID, defined by the below enumeration:```cpp
enum ePopulationType
{
	POPTYPE_UNKNOWN = 0,
	POPTYPE_RANDOM_PERMANENT,
	POPTYPE_RANDOM_PARKED,
	POPTYPE_RANDOM_PATROL,
	POPTYPE_RANDOM_SCENARIO,
	POPTYPE_RANDOM_AMBIENT,
	POPTYPE_PERMANENT,
	POPTYPE_MISSION,
	POPTYPE_REPLAY,
	POPTYPE_CACHE,
	POPTYPE_TOOL
};
```
 */
export function getEntityPopulationType(entity: number): number {
	return _in(0x00000000, 0xfc30ddff, entity, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @param entityIndex
 * @param rotX
 * @param rotY
 * @param rotZ
 * @param rotW
 * @return Portal entity rotation.
 */
export function getInteriorPortalEntityRotation(interiorId: number, portalIndex: number, entityIndex: number, rotX: number, rotY: number, rotZ: number, rotW: number): void {
	return _in(0x00000000, 0x9f9ceb63, interiorId, portalIndex, entityIndex, rotX, rotY, rotZ, rotW); 
}

/**
 * Gets the metadata value at a specified key/index from a resource's manifest.
 * See also: [Resource manifest](https://docs.fivem.net/resources/manifest/)
 * @param resourceName
 * @param metadataKey
 * @param index
 */
export function getResourceMetadata(resourceName: string, metadataKey: string, index: number): string {
	return _in(0x00000000, 0x964bab1d, resourceName, metadataKey, index, _r, _s); 
}

/**
 * 
 * @param playerSrc
 */
export function getPlayerMaxHealth(playerSrc: string): number {
	return _in(0x00000000, 0x8154e470, playerSrc, _r, _ri); 
}

/**
 * 
 * @param playerSrc
 */
export function getPlayerLastMsg(playerSrc: string): number {
	return _in(0x00000000, 0x427e8e6a, playerSrc, _r, _ri); 
}

/**
 * A getter for [SET_PLAYER_MELEE_WEAPON_DAMAGE_MODIFIER](#\_0x4A3DC7ECCC321032).
 * @param playerId
 * @return Returns player melee weapon damage modifier value.
 */
export function getPlayerMeleeWeaponDamageModifier(playerId: number): number {
	return _in(0x00000000, 0x8689a825, playerId, _r, _rf); 
}

/**
 * A getter for [SET_RESOURCE_KVP](#\_0x21C7A35B).
 * @param key
 * @return The string value stored under the specified key, or nil/null if not found.
 */
export function getResourceKvpString(key: string): string {
	return _in(0x00000000, 0x5240da5a, key, _r, _s); 
}

/**
 * 
 * @param playerSrc
 * @return A boolean to tell if the player is invincible.
 */
export function getPlayerInvincible(playerSrc: string): boolean {
	return _in(0x00000000, 0x680c90ee, playerSrc, _r, _ri); 
}

/**
 * 
 * @param playerId
 * @return The value of player max stamina.
 */
export function getPlayerMaxStamina(playerId: number): number {
	return _in(0x00000000, 0xd014ab79, playerId, _r, _rf); 
}

/**
 * Gets the current speed of the entity in meters per second.
 * 
 * ```
 * To convert to MPH: speed * 2.236936
 * To convert to KPH: speed * 3.6
 * ```
 * @param entity
 * @return The speed of the entity in meters per second
 */
export function getEntitySpeed(entity: number): number {
	return _in(0x00000000, 0x9e1e4798, entity, _r, _rf); 
}

/**
 * Gets the entity type (as an integer), which can be one of the following defined down below:
 * 
 * **The following entities will return type `2`:**
 * 
 * *   Automobile
 * *   Bike
 * *   Boat
 * *   Heli
 * *   Plane
 * *   Submarine
 * *   Trailer
 * *   Train
 * *   DraftVeh (Red Dead Redemption 2)
 * 
 * **The following entities will return type `1`:**
 * 
 * *   Ped
 * *   Player
 * *   Animal (Red Dead Redemption 2)
 * *   Horse (Red Dead Redemption 2)
 * 
 * **The following entities will return type `3`:**
 * 
 * *   Object
 * *   Door
 * *   Pickup
 * 
 * Otherwise, a value of `0` will be returned.
 * @param entity
 * @return The entity type returned as an integer value.
 */
export function getEntityType(entity: number): number {
	return _in(0x00000000, 0x0b1bd08d, entity, _r, _ri); 
}

/**
 * 
 * @param playerSrc
 */
export function getPlayerMaxArmour(playerSrc: string): number {
	return _in(0x00000000, 0x02a50657, playerSrc, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @return Portal's flag.
 */
export function getInteriorPortalFlag(interiorId: number, portalIndex: number): number {
	return _in(0x00000000, 0xc74da47c, interiorId, portalIndex, _r, _ri); 
}

/**
 * A getter for [SET_PED_DENSITY_MULTIPLIER_THIS_FRAME](#\_0x95E3D6257B166CF2).
 * @return Returns ped density multiplier value.
 */
export function getPedDensityMultiplier(): number {
	return _in(0x00000000, 0xf5a904f9, _r, _rf); 
}

/**
 * A getter for [\_SET_PED_FACE_FEATURE](#\_0x71A5C1DBA060049E). Returns 0.0 if fails to get.
 * @param ped
 * @param index
 * @return Returns ped's face feature value, or 0.0 if fails to get.
 */
export function getPedFaceFeature(ped: number, index: number): number {
	return _in(0x00000000, 0xba352add, ped, index, _r, _rf); 
}

/**
 * 
 * @param interiorId
 * @param roomIndex
 * @return Room's flag.
 */
export function getInteriorRoomFlag(interiorId: number, roomIndex: number): number {
	return _in(0x00000000, 0x6b7af743, interiorId, roomIndex, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @param roomIndex
 * @return Room's timecycle hash.
 */
export function getInteriorRoomTimecycle(interiorId: number, roomIndex: number): number {
	return _in(0x00000000, 0x82ba3f88, interiorId, roomIndex, _r, _ri); 
}

/**
 * 
 * @param entity
 */
export function getEntityVelocity(entity: number): Vector3 {
	return _in(0x00000000, 0xc14c9b6b, entity, _r, _rv); 
}

/**
 * 
 */
export function getInvokingResource(): string {
	return _in(0x00000000, 0x4d52fe5b, _r, _s); 
}

/**
 * 
 */
export function getNumResources(): number {
	return _in(0x00000000, 0x0863f27b, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @param seatIndex
 * @return The ped in the specified seat of the passed vehicle. Returns 0 if the specified seat is not occupied.
 */
export function getPedInVehicleSeat(vehicle: number, seatIndex: number): number {
	return _in(0x00000000, 0x388fde9a, vehicle, seatIndex, _r, _ri); 
}

/**
 * 
 * @param entity
 */
export function getEntityRotation(entity: number): Vector3 {
	return _in(0x00000000, 0x8ff45b04, entity, _r, _rv); 
}

/**
 * Gets the routing bucket for the specified entity.
 * 
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param entity
 * @return The routing bucket ID.
 */
export function getEntityRoutingBucket(entity: number): number {
	return _in(0x00000000, 0xed4b0486, entity, _r, _ri); 
}

/**
 * 
 */
export function getNetworkWalkMode(): boolean {
	return _in(0x00000000, 0x2cafd5e9, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @param seatIndex
 * @return The last ped in the specified seat of the passed vehicle. Returns 0 if the specified seat was never occupied or the last ped does not exist anymore.
 */
export function getLastPedInVehicleSeat(vehicle: number, seatIndex: number): number {
	return _in(0x00000000, 0xf7c6792d, vehicle, seatIndex, _r, _ri); 
}

/**
 * This native converts the passed string to a hash.
 * @param model
 */
export function getHashKey(model: string): number {
	return _in(0x00000000, 0x98eff6f1, model, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @return The amount of rooms in interior.
 */
export function getInteriorRoomCount(interiorId: number): number {
	return _in(0x00000000, 0xa2737c2c, interiorId, _r, _ri); 
}

/**
 * 
 * @param playerSrc
 * @param identifier
 */
export function getPlayerIdentifier(playerSrc: string, identifier: number): string {
	return _in(0x00000000, 0x7302dbcf, playerSrc, identifier, _r, _s); 
}

/**
 * A getter for [\_SET_PED_HAIR_COLOR](#\_0x4CFFC65454C93A49). Returns -1 if fails to get.
 * @param ped
 * @return Returns ped's secondary hair colour.
 */
export function getPedHairHighlightColor(ped: number): number {
	return _in(0x00000000, 0x4b087305, ped, _r, _ri); 
}

/**
 * See the client-side [GET_LANDING_GEAR_STATE](#\_0x9B0F3DCA3DB0F4CD) native for a description of landing gear states.
 * @param vehicle
 * @return The current state of the vehicles landing gear.
 */
export function getLandingGearState(vehicle: number): number {
	return _in(0x00000000, 0xa6f02670, vehicle, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @param roomHash
 * @return Room index, -1 if failed.
 */
export function getInteriorRoomIndexByHash(interiorId: number, roomHash: number): number {
	return _in(0x00000000, 0xe0ee05f8, interiorId, roomHash, _r, _ri); 
}

/**
 * Returns the zoom level data by index from mapzoomdata.meta file.
 * @param index
 * @param zoomScale
 * @param zoomSpeed
 * @param scrollSpeed
 * @param tilesX
 * @param tilesY
 * @return A boolean indicating TRUE if the data was received successfully.
 */
export function getMapZoomDataLevel(index: number, zoomScale: number, zoomSpeed: number, scrollSpeed: number, tilesX: number, tilesY: number): boolean {
	return _in(0x00000000, 0x1363a998, index, zoomScale, zoomSpeed, scrollSpeed, tilesX, tilesY, _r, _ri); 
}

/**
 * 
 * @param rope
 * @return The rope's time multiplier.
 */
export function getRopeTimeMultiplier(rope: number): number {
	return _in(0x00000000, 0xf341e6ca, rope, _r, _rf); 
}

/**
 * Gets the routing bucket for the specified player.
 * 
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param playerSrc
 * @return The routing bucket ID.
 */
export function getPlayerRoutingBucket(playerSrc: string): number {
	return _in(0x00000000, 0x52441c34, playerSrc, _r, _ri); 
}

/**
 * 
 * @param rope
 * @return The rope's length change rate.
 */
export function getRopeLengthChangeRate(rope: number): number {
	return _in(0x00000000, 0x66d70ea3, rope, _r, _rf); 
}

/**
 * 
 * @param rope
 * @return The rope's update order.
 */
export function getRopeUpdateOrder(rope: number): number {
	return _in(0x00000000, 0x2ab2e0f6, rope, _r, _ri); 
}

/**
 * 
 * @param ped
 */
export function getPedMaxHealth(ped: number): number {
	return _in(0x00000000, 0xa45b6c8d, ped, _r, _ri); 
}

/**
 * A getter for [SET_PLAYER_MELEE_WEAPON_DEFENSE_MODIFIER](#\_0xAE540335B4ABC4E2).
 * @param playerId
 * @return The value of player melee weapon defense modifier.
 */
export function getPlayerMeleeWeaponDefenseModifier(playerId: number): number {
	return _in(0x00000000, 0x27e94ef8, playerId, _r, _rf); 
}

/**
 * Gets the row pitch of the specified runtime texture, for use when creating data for `SET_RUNTIME_TEXTURE_ARGB_DATA`.
 * @param tex
 * @return The row pitch in bytes.
 */
export function getRuntimeTexturePitch(tex: number): number {
	return _in(0x00000000, 0xca0a085f, tex, _r, _ri); 
}

/**
 * 
 * @param playerSrc
 */
export function getPlayerTeam(playerSrc: string): number {
	return _in(0x00000000, 0x9873e404, playerSrc, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getIsVehicleEngineRunning(vehicle: number): boolean {
	return _in(0x00000000, 0x7dc6d022, vehicle, _r, _ri); 
}

/**
 * 
 */
export function getVehicleDashboardOilPressure(): number {
	return _in(0x00000000, 0x3856d767, _r, _rf); 
}

/**
 * 
 * @param ped
 * @return Returns ped's desired heading.
 */
export function getPedDesiredHeading(ped: number): number {
	return _in(0x00000000, 0xc182f76e, ped, _r, _rf); 
}

/**
 * Get the last entity that damaged the ped. This native is used server side when using OneSync.
 * @param ped
 * @return The entity id. Returns 0 if the ped has not been damaged recently.
 */
export function getPedSourceOfDamage(ped: number): number {
	return _in(0x00000000, 0x535db43f, ped, _r, _ri); 
}

/**
 * Gets the script task command currently assigned to the ped.
 * @param ped
 * @return The script task command currently assigned to the ped. A value of 0x811E343C denotes no script task is assigned.
 */
export function getPedScriptTaskCommand(ped: number): number {
	return _in(0x00000000, 0x084fe084, ped, _r, _ri); 
}

/**
 * Returns the current state of the specified resource.
 * @param resourceName
 * @return The resource state. One of `"missing", "started", "starting", "stopped", "stopping", "uninitialized" or "unknown"`.
 */
export function getResourceState(resourceName: string): string {
	return _in(0x00000000, 0x4039b485, resourceName, _r, _s); 
}

/**
 * A getter for [\_SET_PED_EYE_COLOR](#\_0x50B56988B170AFDF). Returns -1 if fails to get.
 * @param ped
 * @return Returns ped's eye colour, or -1 if fails to get.
 */
export function getPedEyeColor(ped: number): number {
	return _in(0x00000000, 0xa47b860f, ped, _r, _ri); 
}

/**
 * 
 * @param serverId
 */
export function getPlayerFromServerId(serverId: number): number {
	return _in(0x00000000, 0x344ea166, serverId, _r, _ri); 
}

/**
 * A getter for [\_SET_PED_HAIR_COLOR](#\_0x4CFFC65454C93A49). Returns -1 if fails to get.
 * @param ped
 * @return Returns ped's primary hair colour.
 */
export function getPedHairColor(ped: number): number {
	return _in(0x00000000, 0xa3ea2893, ped, _r, _ri); 
}

/**
 * 
 * @return float 0 to ~1.1 representing the angle of the rpm gauge on the player's vehicle dashboard
 */
export function getVehicleDashboardRpm(): number {
	return _in(0x00000000, 0xf9716a11, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getIsVehiclePrimaryColourCustom(vehicle: number): boolean {
	return _in(0x00000000, 0xd7ec8760, vehicle, _r, _ri); 
}

/**
 * Gets the height of the specified runtime texture.
 * @param tex
 * @return The height in pixels.
 */
export function getRuntimeTextureHeight(tex: number): number {
	return _in(0x00000000, 0x3574aace, tex, _r, _ri); 
}

/**
 * Gets the current fake wanted level for a specified player. This native is used server side when using OneSync.
 * @param playerSrc
 * @return The fake wanted level
 */
export function getPlayerFakeWantedLevel(playerSrc: string): number {
	return _in(0x00000000, 0x0098d244, playerSrc, _r, _ri); 
}

/**
 * Unlike [GET_PLAYER_INVINCIBLE](#\_0xB721981B2B939E07) this native gets both [SET_PLAYER_INVINCIBLE_KEEP_RAGDOLL_ENABLED](#\_0x6BC97F4F4BB3C04B) and [SET_PLAYER_INVINCIBLE](#\_0x239528EACDC3E7DE) invincibility state.
 * @param player
 * @return A boolean to tell if the player is invincible.
 */
export function getPlayerInvincible2(player: number): boolean {
	return _in(0x00000000, 0xf2e3912b, player, _r, _ri); 
}

/**
 * Returns the physical on-disk path of the specified resource.
 * @param resourceName
 * @return The resource directory name, possibly without trailing slash.
 */
export function getResourcePath(resourceName: string): string {
	return _in(0x00000000, 0x61dcf017, resourceName, _r, _s); 
}

/**
 * 
 * @param player
 */
export function getPlayerServerId(player: number): number {
	return _in(0x00000000, 0x4d97bcc7, player, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getIsVehicleSecondaryColourCustom(vehicle: number): boolean {
	return _in(0x00000000, 0x288ad228, vehicle, _r, _ri); 
}

/**
 * 
 * @param index
 */
export function getPlayerFromIndex(index: number): string {
	return _in(0x00000000, 0xc8a9ce08, index, _r, _s); 
}

/**
 * 
 * @param playerSrc
 */
export function getPlayerEndpoint(playerSrc: string): string {
	return _in(0x00000000, 0xfee404f9, playerSrc, _r, _s); 
}

/**
 * Gets a ped model's personality type.
 * @param modelHash
 */
export function getPedModelPersonality(modelHash: number): number {
	return _in(0x00000000, 0xfe08cad6, modelHash, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @param roomIndex
 * @return Room's name.
 */
export function getInteriorRoomName(interiorId: number, roomIndex: number): string {
	return _in(0x00000000, 0x11755df2, interiorId, roomIndex, _r, _s); 
}

/**
 * 
 * @param train
 * @return The train engine carriage.
 */
export function getTrainCarriageEngine(train: number): number {
	return _in(0x00000000, 0x095070fa, train, _r, _ri); 
}

/**
 * A getter for [SET_PED_HEAD_OVERLAY](#\_0x48F44967FA05CC1E) and [\_SET_PED_HEAD_OVERLAY_COLOR](#\_0x497BF74A7B9CB952) natives.
 * @param ped
 * @param index
 * @param overlayValue
 * @param colourType
 * @param firstColour
 * @param secondColour
 * @param overlayOpacity
 * @return Returns ped's head overlay data.
 */
export function getPedHeadOverlayData(ped: number, index: number, overlayValue: number, colourType: number, firstColour: number, secondColour: number, overlayOpacity: number): boolean {
	return _in(0x00000000, 0xc46ee605, ped, index, overlayValue, colourType, firstColour, secondColour, overlayOpacity, _r, _ri); 
}

/**
 * 
 */
export function getVehicleDashboardVacuum(): number {
	return _in(0x00000000, 0xfabe67a9, _r, _rf); 
}

/**
 * 
 * @param interiorId
 * @param rotx
 * @param rotY
 * @param rotZ
 * @param rotW
 * @return Interior rotation in quaternion.
 */
export function getInteriorRotation(interiorId: number, rotx: number, rotY: number, rotZ: number, rotW: number): void {
	return _in(0x00000000, 0x5a039998, interiorId, rotx, rotY, rotZ, rotW); 
}

/**
 * Gets the width of the specified runtime texture.
 * @param tex
 * @return The width in pixels.
 */
export function getRuntimeTextureWidth(tex: number): number {
	return _in(0x00000000, 0xc9f55558, tex, _r, _ri); 
}

/**
 * 
 */
export function getVehicleDashboardWaterTemp(): number {
	return _in(0x00000000, 0x8e3b3e42, _r, _rf); 
}

/**
 * Currently it only works when set to "all players".
 * @param vehicle
 */
export function getVehicleDoorsLockedForPlayer(vehicle: number): number {
	return _in(0x00000000, 0x1dc50247, vehicle, _r, _ri); 
}

/**
 * ```
 * Gets the amount of time player has spent evading the cops.
 * Counter starts and increments only when cops are chasing the player.
 * If the player is evading, the timer will pause.
 * ```
 * @param playerSrc
 * @param lastPursuit
 * @return Returns -1, if the player is not wanted or wasn't in pursuit before, depending on the lastPursuit parameter
Returns 0, if lastPursuit == False and the player has a wanted level, but the pursuit has not started yet
Otherwise, will return the milliseconds of the pursuit.
 */
export function getPlayerTimeInPursuit(playerSrc: string, lastPursuit: boolean): number {
	return _in(0x00000000, 0x7ade63e1, playerSrc, lastPursuit, _r, _ri); 
}

/**
 * 
 * @param playerSrc
 */
export function getPlayerName(playerSrc: string): string {
	return _in(0x00000000, 0x406b4b20, playerSrc, _r, _s); 
}

/**
 * 
 * @param playerSrc
 */
export function getPlayerPed(playerSrc: string): number {
	return _in(0x00000000, 0x6e31e993, playerSrc, _r, _ri); 
}

/**
 * Gets the door count for the specified train.
 * @param train
 * @return The door count.
 */
export function getTrainDoorCount(train: number): number {
	return _in(0x00000000, 0x99974721, train, _r, _ri); 
}

/**
 * 
 * @param playerSrc
 */
export function getPlayerPing(playerSrc: string): number {
	return _in(0x00000000, 0xff1290d4, playerSrc, _r, _ri); 
}

/**
 * A getter for [SET_VEHICLE_DENSITY_MULTIPLIER_THIS_FRAME](#\_0x245A6883D966D537).
 * @return Returns vehicle density multiplier value.
 */
export function getVehicleDensityMultiplier(): number {
	return _in(0x00000000, 0xef7c6538, _r, _rf); 
}

/**
 * Get the entity that killed the ped. This native is used server side when using OneSync.
 * @param ped
 * @return The entity id. Returns 0 if the ped has no killer.
 */
export function getPedSourceOfDeath(ped: number): number {
	return _in(0x00000000, 0x84adf9eb, ped, _r, _ri); 
}

/**
 * A getter for [SET_RESOURCE_KVP_FLOAT](#\_0x9ADD2938).
 * @param key
 * @return The floating-point value stored under the specified key, or 0.0 if not found.
 */
export function getResourceKvpFloat(key: string): number {
	return _in(0x00000000, 0x35bdceea, key, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleDashboardSpeed(vehicle: number): number {
	return _in(0x00000000, 0x9aad420e, vehicle, _r, _rf); 
}

/**
 * 
 * @param x
 * @param y
 */
export function getNuiCursorPosition(x: number, y: number): void {
	return _in(0x00000000, 0xbdba226f, x, y); 
}

/**
 * ```
 * Returns given players wanted level server-side.
 * ```
 * @param playerSrc
 * @return The wanted level
 */
export function getPlayerWantedLevel(playerSrc: string): number {
	return _in(0x00000000, 0xbdcdd163, playerSrc, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleNumberOfWheels(vehicle: number): number {
	return _in(0x00000000, 0xedf4b0fc, vehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleDirtLevel(vehicle: number): number {
	return _in(0x00000000, 0xfd15c065, vehicle, _r, _rf); 
}

/**
 * Gets the type of a ped's specific task given an index of the CPedTaskSpecificDataNode nodes.
 * A ped will typically have a task at index 0, if a ped has multiple tasks at once they will be in the order 0, 1, 2, etc.
 * @param ped
 * @param index
 * @return The type of the specific task.
1604: A value of 530 denotes no script task is assigned or an invalid input was given.
2060+: A value of 531 denotes no script task is assigned or an invalid input was given.
 */
export function getPedSpecificTaskType(ped: number, index: number): number {
	return _in(0x00000000, 0x7f4563d3, ped, index, _r, _ri); 
}

/**
 * Returns all commands that are registered in the command system.
 * The data returned adheres to the following layout:
 * 
 * ```
 * [
 * {
 * "name": "cmdlist"
 * },
 * {
 * "name": "command1"
 * }
 * ]
 * ```
 * @return An object containing registered commands.
 */
export function getRegisteredCommands(): number {
	return _in(0x00000000, 0xd4bef069, _r, _ro); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleNumberPlateText(vehicle: number): string {
	return _in(0x00000000, 0xe8522d58, vehicle, _r, _s); 
}

/**
 * ```cpp
 * enum eRopeFlags
 * {
 * DrawShadowEnabled = 2,
 * Breakable = 4,
 * RopeUnwindingFront = 8,
 * RopeWinding = 32
 * }
 * ```
 * @param rope
 * @return The rope's flags.
 */
export function getRopeFlags(rope: number): number {
	return _in(0x00000000, 0xa80ffe99, rope, _r, _ri); 
}

/**
 * 
 */
export function getVehicleDashboardOilTemp(): number {
	return _in(0x00000000, 0x1f5996aa, _r, _rf); 
}

/**
 * 
 * @param train
 * @return The carriage index. -1 returned if invalid result.
 */
export function getTrainCarriageIndex(train: number): number {
	return _in(0x00000000, 0x4b8285cf, train, _r, _ri); 
}

/**
 * 
 * @param findIndex
 * @return The resource name as a `string`
 */
export function getResourceByFindIndex(findIndex: number): string {
	return _in(0x00000000, 0x387246b7, findIndex, _r, _s); 
}

/**
 * Gets a player's token. Tokens can be used to enhance banning logic, however are specific to a server.
 * @param playerSrc
 * @param index
 * @return A token value.
 */
export function getPlayerToken(playerSrc: string, index: number): string {
	return _in(0x00000000, 0x54c06897, playerSrc, index, _r, _s); 
}

/**
 * Gets the current camera rotation for a specified player. This native is used server side when using OneSync.
 * @param playerSrc
 * @return The player's camera rotation. Values are in radians.
 */
export function getPlayerCameraRotation(playerSrc: string): Vector3 {
	return _in(0x00000000, 0x433c765d, playerSrc, _r, _rv); 
}

/**
 * 
 * @param playerId
 * @return The value of player stamina.
 */
export function getPlayerStamina(playerId: number): number {
	return _in(0x00000000, 0xe415ec5c, playerId, _r, _rf); 
}

/**
 * 
 * @param ped
 * @return The current movement clipset hash.
 */
export function getPedMovementClipset(ped: number): number {
	return _in(0x00000000, 0x69e81e3d, ped, _r, _ri); 
}

/**
 * Gets the ratio that a door is open for on a train.
 * @param train
 * @param doorIndex
 * @return A value between 0.0 (fully closed) and 1.0 (fully open).
 */
export function getTrainDoorOpenRatio(train: number, doorIndex: number): number {
	return _in(0x00000000, 0x40b16551, train, doorIndex, _r, _rf); 
}

/**
 * Gets the stage of the peds scripted task.
 * @param ped
 * @return The stage of the ped's scripted task. A value of 3 denotes no script task is assigned.
 */
export function getPedScriptTaskStage(ped: number): number {
	return _in(0x00000000, 0x44b0e5e2, ped, _r, _ri); 
}

/**
 * ```lua
 * enum_VehicleLockStatus = {
 * None = 0,
 * Locked = 2,
 * LockedForPlayer = 3,
 * StickPlayerInside = 4, -- Doesn't allow players to exit the vehicle with the exit vehicle key.
 * CanBeBrokenInto = 7, -- Can be broken into the car. If the glass is broken, the value will be set to 1
 * CanBeBrokenIntoPersist = 8, -- Can be broken into persist
 * CannotBeTriedToEnter = 10, -- Cannot be tried to enter (Nothing happens when you press the vehicle enter key).
 * }
 * ```
 * 
 * It should be [noted](https://forum.cfx.re/t/4863241) that while the [client-side command](#\_0x25BC98A59C2EA962) and its
 * setter distinguish between states 0 (unset) and 1 (unlocked), the game will synchronize both as state 0, so the server-side
 * command will return only '0' if unlocked.
 * @param vehicle
 * @return The door lock status for the specified vehicle.
 */
export function getVehicleDoorLockStatus(vehicle: number): number {
	return _in(0x00000000, 0x0d72cef2, vehicle, _r, _ri); 
}

/**
 * A getter for [SET_PLAYER_VEHICLE_DEFENSE_MODIFIER](#\_0x4C60E6EFDAFF2462).
 * @param playerId
 * @return The value of player vehicle defense modifier.
 */
export function getPlayerVehicleDefenseModifier(playerId: number): number {
	return _in(0x00000000, 0x8326e7cd, playerId, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleEngineTemperature(vehicle: number): number {
	return _in(0x00000000, 0xf4f495cb, vehicle, _r, _rf); 
}

/**
 * Returns a hash of selected ped weapon.
 * @param ped
 * @return The weapon hash.
 */
export function getSelectedPedWeapon(ped: number): number {
	return _in(0x00000000, 0xd240123e, ped, _r, _ri); 
}

/**
 * A getter for [SET_RANDOM_VEHICLE_DENSITY_MULTIPLIER_THIS_FRAME](#\_0xB3B3359379FE77D3).
 * Same as vehicle density multiplier.
 * @return Returns random vehicle density multiplier value.
 */
export function getRandomVehicleDensityMultiplier(): number {
	return _in(0x00000000, 0x7b0d00c5, _r, _rf); 
}

/**
 * A getter for [SET_SCENARIO_PED_DENSITY_MULTIPLIER_THIS_FRAME](#\_0x7A556143A1C03898).
 * @return Returns scenario ped density multiplier value.
 */
export function getScenarioPedDensityMultiplier(): number {
	return _in(0x00000000, 0x77c598b2, _r, _rf); 
}

/**
 * 
 */
export function getVehicleDashboardFuel(): number {
	return _in(0x00000000, 0x19b0b2ce, _r, _rf); 
}

/**
 * Returns the value of a state bag key.
 * @param bagName
 * @param key
 * @return Value.
 */
export function getStateBagValue(bagName: string, key: string): number {
	return _in(0x00000000, 0x637f4c75, bagName, key, _r, _ro); 
}

/**
 * Gets the traction vector length of a wheel.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * @param vehicle
 * @param wheelIndex
 */
export function getVehicleWheelTractionVectorLength(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0x3bcfee14, vehicle, wheelIndex, _r, _rf); 
}

/**
 * A getter for [SET_PLAYER_WEAPON_DAMAGE_MODIFIER](#\_0xCE07B9F7817AADA3).
 * @param playerId
 * @return The value of player weapon damage modifier.
 */
export function getPlayerWeaponDamageModifier(playerId: number): number {
	return _in(0x00000000, 0x2a3d7cda, playerId, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehiclePetrolTankHealth(vehicle: number): number {
	return _in(0x00000000, 0xe41595ce, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleSteeringAngle(vehicle: number): number {
	return _in(0x00000000, 0x1382fcea, vehicle, _r, _rf); 
}

/**
 * Gets the vehicle the specified Ped is/was in depending on bool value. This native is used server side when using OneSync.
 * @param ped
 * @param lastVehicle
 * @return The vehicle id. Returns 0 if the ped is/was not in a vehicle.
 */
export function getVehiclePedIsIn(ped: number, lastVehicle: boolean): number {
	return _in(0x00000000, 0xafe92319, ped, lastVehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleRadioStationIndex(vehicle: number): number {
	return _in(0x00000000, 0x57037960, vehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleFuelLevel(vehicle: number): number {
	return _in(0x00000000, 0x5f739bb8, vehicle, _r, _rf); 
}

/**
 * 
 */
export function getVehicleDashboardTemp(): number {
	return _in(0x00000000, 0x6b6adafa, _r, _rf); 
}

/**
 * 
 * @param vehicle
 * @param pearlescentColor
 * @param wheelColor
 */
export function getVehicleExtraColours(vehicle: number, pearlescentColor: number, wheelColor: number): void {
	return _in(0x00000000, 0x80e4659b, vehicle, pearlescentColor, wheelColor); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleAlarmTimeLeft(vehicle: number): number {
	return _in(0x00000000, 0xc62aac98, vehicle, _r, _ri); 
}

/**
 * A getter for [SET_PLAYER_WEAPON_DEFENSE_MODIFIER](#\_0x2D83BC011CA14A3C).
 * @param playerId
 * @return The value of player weapon defense modifier.
 */
export function getPlayerWeaponDefenseModifier(playerId: number): number {
	return _in(0x00000000, 0xf1543251, playerId, _r, _rf); 
}

/**
 * 
 */
export function getVehicleDashboardBoost(): number {
	return _in(0x00000000, 0xdffaba2a, _r, _rf); 
}

/**
 * 
 * @param train
 * @return Train's current track node index.
 */
export function getTrainCurrentTrackNode(train: number): number {
	return _in(0x00000000, 0xe015e854, train, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleNumberPlateTextIndex(vehicle: number): number {
	return _in(0x00000000, 0x499747b6, vehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @param colorPrimary
 * @param colorSecondary
 */
export function getVehicleColours(vehicle: number, colorPrimary: number, colorSecondary: number): void {
	return _in(0x00000000, 0x40d82d88, vehicle, colorPrimary, colorSecondary); 
}

/**
 * A getter for [\_SET_PLAYER_WEAPON_DEFENSE_MODIFIER\_2](#\_0xBCFDE9EDE4CF27DC).
 * @param playerId
 * @return The value of player weapon defense modifier 2.
 */
export function getPlayerWeaponDefenseModifier2(playerId: number): number {
	return _in(0x00000000, 0x986b65ff, playerId, _r, _rf); 
}

/**
 * Gets the current known coordinates for the specified player from cops perspective. This native is used server side when using OneSync.
 * @param playerSrc
 * @return The player's position known by police. Vector zero if the player has no wanted level.
 */
export function getPlayerWantedCentrePosition(playerSrc: string): Vector3 {
	return _in(0x00000000, 0x821f2d2c, playerSrc, _r, _rv); 
}

/**
 * 
 * @param vehicle
 * @param color
 */
export function getVehicleDashboardColour(vehicle: number, color: number): void {
	return _in(0x00000000, 0xa0dbd08d, vehicle, color); 
}

/**
 * A getter for [SET_PLAYER_VEHICLE_DAMAGE_MODIFIER](#\_0xA50E117CDDF82F0C).
 * @param playerId
 * @return The value of player vehicle damage modifier.
 */
export function getPlayerVehicleDamageModifier(playerId: number): number {
	return _in(0x00000000, 0x78f27b1f, playerId, _r, _rf); 
}

/**
 * Returns the offset of the specified wheel relative to the wheel's axle center.
 * @param vehicle
 * @param wheelIndex
 */
export function getVehicleWheelXOffset(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0xcc90cbca, vehicle, wheelIndex, _r, _rf); 
}

/**
 * Gets a vehicle's multiplier used with a wheel's GET_VEHICLE_WHEEL_STEERING_ANGLE to determine the angle the wheel is rendered.
 * @param vehicle
 */
export function getVehicleDrawnWheelAngleMult(vehicle: number): number {
	return _in(0x00000000, 0x21c1da8e, vehicle, _r, _rf); 
}

/**
 * A getter for [SET_VEHICLE_CHEAT_POWER_INCREASE](#\_0xB59E4BD37AE292DB).
 * @param vehicle
 * @return Returns vehicle's cheat power increase modifier value.
 */
export function getVehicleCheatPowerIncrease(vehicle: number): number {
	return _in(0x00000000, 0xc3c93f28, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleEngineHealth(vehicle: number): number {
	return _in(0x00000000, 0x8880038a, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleRoofLivery(vehicle: number): number {
	return _in(0x00000000, 0x0872cf42, vehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @return A number from 0 to 7.
 */
export function getVehicleDoorStatus(vehicle: number): number {
	return _in(0x00000000, 0x6e35c49c, vehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @param r
 * @param g
 * @param b
 */
export function getVehicleCustomSecondaryColour(vehicle: number, r: number, g: number, b: number): void {
	return _in(0x00000000, 0x3ff247a2, vehicle, r, g, b); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleSteeringScale(vehicle: number): number {
	return _in(0x00000000, 0x954465de, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleCurrentGear(vehicle: number): number {
	return _in(0x00000000, 0xb4f4e566, vehicle, _r, _ri); 
}

/**
 * On the server this will return the players source, on the client it will return the player handle.
 * @param bagName
 * @return The player handle or 0 if the state bag name did not refer to a player, or the player does not exist.
 */
export function getPlayerFromStateBagName(bagName: string): number {
	return _in(0x00000000, 0xa56135e0, bagName, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleNextGear(vehicle: number): number {
	return _in(0x00000000, 0xddb298ae, vehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleGravityAmount(vehicle: number): number {
	return _in(0x00000000, 0xb48a1292, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleLivery(vehicle: number): number {
	return _in(0x00000000, 0xec82a51d, vehicle, _r, _ri); 
}

/**
 * A getter for `ClipSize` in a weapon component.
 * @param componentHash
 * @return A weapon component clip size.
 */
export function getWeaponComponentClipSize(componentHash: number): number {
	return _in(0x00000000, 0xe14cf665, componentHash, _r, _ri); 
}

/**
 * Returns the type of the passed vehicle.
 * 
 * ### Vehicle types
 * 
 * *   automobile
 * *   bike
 * *   boat
 * *   heli
 * *   plane
 * *   submarine
 * *   trailer
 * *   train
 * @param vehicle
 * @return If the entity is a vehicle, the vehicle type. If it is not a vehicle, the return value will be null.
 */
export function getVehicleType(vehicle: number): string {
	return _in(0x00000000, 0xa273060e, vehicle, _r, _s); 
}

/**
 * A getter for [SET_WEAPON_ANIMATION_OVERRIDE](\_0x1055AC3A667F09D9).
 * @param ped
 * @return The weapon animation override.
 */
export function getWeaponAnimationOverride(ped: number): number {
	return _in(0x00000000, 0x063ed2e7, ped, _r, _ri); 
}

/**
 * Returns vehicle xenon lights custom RGB color values. Do note this native doesn't return non-RGB colors that was set with [\_SET_VEHICLE_XENON_LIGHTS_COLOR](#\_0xE41033B25D003A07).
 * @param vehicle
 * @param red
 * @param green
 * @param blue
 * @return A boolean indicating if vehicle have custom xenon lights RGB color.
 */
export function getVehicleXenonLightsCustomColor(vehicle: number, red: number, green: number, blue: number): boolean {
	return _in(0x00000000, 0xc715f730, vehicle, red, green, blue, _r, _ri); 
}

/**
 * A getter for `CWeaponAccuracyModifier` in a weapon component.
 * @param componentHash
 * @return A weapon component accuracy modifier.
 */
export function getWeaponComponentAccuracyModifier(componentHash: number): number {
	return _in(0x00000000, 0xc693e278, componentHash, _r, _rf); 
}

/**
 * Gets the flags of a wheel.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * @param vehicle
 * @param wheelIndex
 * @return An unsigned int containing bit flags.
 */
export function getVehicleWheelFlags(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0xc70fa0c7, vehicle, wheelIndex, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleCurrentRpm(vehicle: number): number {
	return _in(0x00000000, 0xe7b12b54, vehicle, _r, _rf); 
}

/**
 * Requests whether or not the commerce data for the specified player has loaded from Tebex.
 * @param playerSrc
 * @return A boolean.
 */
export function isPlayerCommerceInfoLoadedExt(playerSrc: string): boolean {
	return _in(0x00000000, 0x1d14f4fe, playerSrc, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @param wheelIndex
 */
export function getVehicleWheelYRotation(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0x2ea4affe, vehicle, wheelIndex, _r, _rf); 
}

/**
 * Gets the flight nozzel position for the specified vehicle. See the client-side [\_GET_VEHICLE_FLIGHT_NOZZLE_POSITION](#\_0xDA62027C8BDB326E) native for usage examples.
 * @param vehicle
 * @return The flight nozzel position between 0.0 (flying normally) and 1.0 (VTOL mode)
 */
export function getVehicleFlightNozzlePosition(vehicle: number): number {
	return _in(0x00000000, 0xad40ad55, vehicle, _r, _rf); 
}

/**
 * Returns vehicle's wheels' width (width is the same for all the wheels, cannot get/set specific wheel of vehicle).
 * Only works on non-default wheels (returns 0 in case of default wheels).
 * @param vehicle
 * @return Float representing width of the wheel (usually between 0.1 and 1.5)
 */
export function getVehicleWheelWidth(vehicle: number): number {
	return _in(0x00000000, 0x9c7b59f9, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 * @param r
 * @param g
 * @param b
 */
export function getVehicleTyreSmokeColor(vehicle: number, r: number, g: number, b: number): void {
	return _in(0x00000000, 0x75280015, vehicle, r, g, b); 
}

/**
 * A getter for `CWeaponDamageModifier` in a weapon component.
 * @param componentHash
 * @return A weapon component damage modifier.
 */
export function getWeaponComponentDamageModifier(componentHash: number): number {
	return _in(0x00000000, 0x4a0e3855, componentHash, _r, _rf); 
}

/**
 * A getter for `CameraHash` in a weapon scope component.
 * @param componentHash
 * @return The hash of the scope camera.
 */
export function getWeaponComponentCameraHash(componentHash: number): number {
	return _in(0x00000000, 0xacb7e68f, componentHash, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @param wheelIndex
 */
export function getVehicleWheelHealth(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0x54a677f5, vehicle, wheelIndex, _r, _rf); 
}

/**
 * A getter for [SET_RESOURCE_KVP_INT](#\_0x6A2B1E8).
 * @param key
 * @return The integer value stored under the specified key, or 0 if not found.
 */
export function getResourceKvpInt(key: string): number {
	return _in(0x00000000, 0x557b586a, key, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleBodyHealth(vehicle: number): number {
	return _in(0x00000000, 0x2b2fcc28, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 * @param wheelIndex
 * @return Float representing width of the wheel collider.
 */
export function getVehicleWheelTireColliderWidth(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0xef65929c, vehicle, wheelIndex, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleHeadlightsColour(vehicle: number): number {
	return _in(0x00000000, 0xd7147656, vehicle, _r, _ri); 
}

/**
 * Requests whether or not the commerce data for the specified player has loaded.
 * @param playerSrc
 * @return A boolean.
 */
export function isPlayerCommerceInfoLoaded(playerSrc: string): boolean {
	return _in(0x00000000, 0xbefe93f4, playerSrc, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleTurboPressure(vehicle: number): number {
	return _in(0x00000000, 0xe02b51d7, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 * @param r
 * @param g
 * @param b
 */
export function getVehicleCustomPrimaryColour(vehicle: number, r: number, g: number, b: number): void {
	return _in(0x00000000, 0x1c2b9fef, vehicle, r, g, b); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleOilLevel(vehicle: number): number {
	return _in(0x00000000, 0xfc7f8ef4, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleClutch(vehicle: number): number {
	return _in(0x00000000, 0x1dad4583, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleLightMultiplier(vehicle: number): number {
	return _in(0x00000000, 0x7e6e219c, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 * @param lightsOn
 * @param highbeamsOn
 */
export function getVehicleLightsState(vehicle: number, lightsOn: boolean, highbeamsOn: boolean): boolean {
	return _in(0x00000000, 0x7c278621, vehicle, lightsOn, highbeamsOn, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @param color
 */
export function getVehicleInteriorColour(vehicle: number, color: number): void {
	return _in(0x00000000, 0xccff3b6e, vehicle, color); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleHandbrake(vehicle: number): boolean {
	return _in(0x00000000, 0x483b013c, vehicle, _r, _ri); 
}

/**
 * A getter for the recoil shake amplitude of a weapon.
 * @param weaponHash
 * @return The recoil shake amplitude of a weapon.
 */
export function getWeaponRecoilShakeAmplitude(weaponHash: number): number {
	return _in(0x00000000, 0x05e1af5f, weaponHash, _r, _rf); 
}

/**
 * A getter for [MODIFY_VEHICLE_TOP_SPEED](#\_0x93A3996368C94158). Returns -1.0 if a modifier is not set.
 * @param vehicle
 * @return Returns vehicle's modified top speed.
 */
export function getVehicleTopSpeedModifier(vehicle: number): number {
	return _in(0x00000000, 0x998b7fee, vehicle, _r, _rf); 
}

/**
 * A getter for [\_SET_WEAPON_DAMAGE_MODIFIER](#\_0x4757F00BC6323CFE).
 * @param weaponHash
 * @return A weapon damage modifier.
 */
export function getWeaponDamageModifier(weaponHash: number): number {
	return _in(0x00000000, 0x0d979143, weaponHash, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function isVehicleSirenOn(vehicle: number): boolean {
	return _in(0x00000000, 0x25eb5873, vehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @return A float among -1 and 1 according if the vehicle is moving forwards or backwards
 */
export function getVehicleThrottleOffset(vehicle: number): number {
	return _in(0x00000000, 0xd1d07351, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function isVehiclePreviouslyOwnedByPlayer(vehicle: number): boolean {
	return _in(0x00000000, 0xf849ed67, vehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function isVehicleEngineStarting(vehicle: number): boolean {
	return _in(0x00000000, 0xbb340d04, vehicle, _r, _ri); 
}

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * 
 * Returns whether an asynchronous streaming file registration completed.
 * @param registerAs
 * @return Whether or not the streaming file has been registered.
 */
export function isStreamingFileReady(registerAs: string): boolean {
	return _in(0x00000000, 0xa194934d, registerAs, _r, _ri); 
}

/**
 * Returns the effective handling data of a vehicle as an integer value.
 * Example: `local modelFlags = GetVehicleHandlingInt(vehicle, 'CHandlingData', 'strModelFlags')`
 * @param vehicle
 * @param class_
 * @param fieldName
 * @return An integer.
 */
export function getVehicleHandlingInt(vehicle: number, class_: string, fieldName: string): number {
	return _in(0x00000000, 0x27396c75, vehicle, class_, fieldName, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleHighGear(vehicle: number): number {
	return _in(0x00000000, 0xf1d1d689, vehicle, _r, _ri); 
}

/**
 * Gets the state of the player vehicle's dashboard lights as a bit set
 * indicator_left = 1
 * indicator_right = 2
 * handbrakeLight = 4
 * engineLight = 8
 * ABSLight = 16
 * gasLight = 32
 * oilLight = 64
 * headlights = 128
 * highBeam = 256
 * batteryLight = 512
 */
export function getVehicleDashboardLights(): number {
	return _in(0x00000000, 0x500ffe9d, _r, _ri); 
}

/**
 * Gets the lock on state for the specified vehicle. See the client-side [GET_VEHICLE_HOMING_LOCKON_STATE](#\_0xE6B0E8CFC3633BF0) native for a description of lock on states.
 * @param vehicle
 * @return The lock on state.
 */
export function getVehicleHomingLockonState(vehicle: number): number {
	return _in(0x00000000, 0xfbde9fd8, vehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function isVehicleInteriorLightOn(vehicle: number): boolean {
	return _in(0x00000000, 0xa411f72c, vehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @param wheelID
 * @param completely
 */
export function isVehicleTyreBurst(vehicle: number, wheelID: number, completely: boolean): boolean {
	return _in(0x00000000, 0x48c80210, vehicle, wheelID, completely, _r, _ri); 
}

/**
 * ```
 * This will return true if the player is evading wanted level, meaning that the wanted level stars are blink.
 * Otherwise will return false.
 * 
 * If the player is not wanted, it simply returns false.
 * ```
 * @param playerSrc
 * @return boolean value, depending if the player is evading his wanted level or not.
 */
export function isPlayerEvadingWantedLevel(playerSrc: string): boolean {
	return _in(0x00000000, 0x89a3881a, playerSrc, _r, _ri); 
}

/**
 * A getter for `ReticuleHash` in a weapon scope component.
 * @param componentHash
 * @return The hash of the reticule camera.
 */
export function getWeaponComponentReticuleHash(componentHash: number): number {
	return _in(0x00000000, 0xf9ab9297, componentHash, _r, _ri); 
}

/**
 * Gets brake pressure of a wheel.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * Normal values around 1.0f when braking.
 * @param vehicle
 * @param wheelIndex
 */
export function getVehicleWheelBrakePressure(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0x70fe2eff, vehicle, wheelIndex, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function hasVehicleBeenOwnedByPlayer(vehicle: number): boolean {
	return _in(0x00000000, 0xe4e83a5b, vehicle, _r, _ri); 
}

/**
 * Gets the current suspension compression of a wheel.
 * Returns a positive value. 0 means the suspension is fully extended, the wheel is off the ground.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * @param vehicle
 * @param wheelIndex
 * @return The current compression of the wheel's suspension.
 */
export function getVehicleWheelSuspensionCompression(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0x2b48175b, vehicle, wheelIndex, _r, _rf); 
}

/**
 * 
 * @param principal
 * @param object
 */
export function isPrincipalAceAllowed(principal: string, object: string): boolean {
	return _in(0x00000000, 0x37cf52ce, principal, object, _r, _ri); 
}

/**
 * Gets the rotation speed of a wheel.
 * This is used internally to calcuate GET_VEHICLE_WHEEL_SPEED.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * @param vehicle
 * @param wheelIndex
 * @return The angular velocity of the wheel.
 */
export function getVehicleWheelRotationSpeed(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0xea1859e5, vehicle, wheelIndex, _r, _rf); 
}

/**
 * Returns the mumble voice channel from a player's server id.
 * @param serverId
 * @return Int representing the identifier of the voice channel.
 */
export function mumbleGetVoiceChannelFromServerId(serverId: number): number {
	return _in(0x00000000, 0x221c09f1, serverId, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @param extraId
 */
export function isVehicleExtraTurnedOn(vehicle: number, extraId: number): boolean {
	return _in(0x00000000, 0x042098b5, vehicle, extraId, _r, _ri); 
}

/**
 * 
 * @param vehicle
 * @param wheelIndex
 * @return Float representing size of the wheel collider.
 */
export function getVehicleWheelTireColliderSize(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0xe0ba9fe6, vehicle, wheelIndex, _r, _rf); 
}

/**
 * List of known states:
 * 
 * ```
 * 1: Not wheeling.
 * 65: Vehicle is ready to do wheelie (burnouting).
 * 129: Vehicle is doing wheelie.
 * ```
 * @param vehicle
 * @return Vehicle's current wheelie state.
 */
export function getVehicleWheelieState(vehicle: number): number {
	return _in(0x00000000, 0x137260d1, vehicle, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function isVehicleAlarmSet(vehicle: number): boolean {
	return _in(0x00000000, 0xdc921211, vehicle, _r, _ri); 
}

/**
 * This native checks if the given ped is a player.
 * @param ped
 * @return Returns `true` if the ped is a player, `false` otherwise.
 */
export function isPedAPlayer(ped: number): boolean {
	return _in(0x00000000, 0x404794ca, ped, _r, _ri); 
}

/**
 * Returns the effective handling data of a vehicle as a floating-point value.
 * Example: `local fSteeringLock = GetVehicleHandlingFloat(vehicle, 'CHandlingData', 'fSteeringLock')`
 * @param vehicle
 * @param class_
 * @param fieldName
 * @return A floating-point value.
 */
export function getVehicleHandlingFloat(vehicle: number, class_: string, fieldName: string): number {
	return _in(0x00000000, 0x642fc12f, vehicle, class_, fieldName, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function hasEntityBeenMarkedAsNoLongerNeeded(vehicle: number): boolean {
	return _in(0x00000000, 0x9c9a3be0, vehicle, _r, _ri); 
}

/**
 * Clears channels from the target list for the specified Mumble voice target ID.
 * @param targetId
 */
export function mumbleClearVoiceTargetChannels(targetId: number): void {
	return _in(0x00000000, 0x5ea72e76, targetId); 
}

/**
 * Starts listening to the specified channel, when available.
 * @param channel
 */
export function mumbleAddVoiceChannelListen(channel: number): void {
	return _in(0x00000000, 0xc79f44bf, channel); 
}

/**
 * A getter for `CWeaponFallOffModifier` range modifier value in a weapon component.
 * @param componentHash
 * @return A weapon component range modifier.
 */
export function getWeaponComponentRangeModifier(componentHash: number): number {
	return _in(0x00000000, 0x2fd0bc1b, componentHash, _r, _rf); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleWindowTint(vehicle: number): number {
	return _in(0x00000000, 0x13d53892, vehicle, _r, _ri); 
}

/**
 * Gets the vehicle indicator light state. 0 = off, 1 = left, 2 = right, 3 = both
 * @param vehicle
 * @return An integer.
 */
export function getVehicleIndicatorLights(vehicle: number): number {
	return _in(0x00000000, 0x83070354, vehicle, _r, _ri); 
}

/**
 * Returns vehicle's wheels' size (size is the same for all the wheels, cannot get/set specific wheel of vehicle).
 * Only works on non-default wheels (returns 0 in case of default wheels).
 * @param vehicle
 * @return Float representing size of the wheel (usually between 0.5 and 1.5)
 */
export function getVehicleWheelSize(vehicle: number): number {
	return _in(0x00000000, 0x04046b66, vehicle, _r, _rf); 
}

/**
 * 
 * @param vehicle
 * @param wheelIndex
 * @return Integer representing the index of the current surface material of that wheel. Check materials.dat for the indexes.
 */
export function getVehicleWheelSurfaceMaterial(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0xa7f04022, vehicle, wheelIndex, _r, _ri); 
}

/**
 * Gets power being sent to a wheel.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * @param vehicle
 * @param wheelIndex
 */
export function getVehicleWheelPower(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0x0d203287, vehicle, wheelIndex, _r, _rf); 
}

/**
 * Gets speed of a wheel at the tyre.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * @param vehicle
 * @param wheelIndex
 * @return An integer.
 */
export function getVehicleWheelSpeed(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0x149c9da0, vehicle, wheelIndex, _r, _rf); 
}

/**
 * Converts a screen coordinate into its relative world coordinate.
 * @param screenX
 * @param screenY
 * @param worldVector
 * @param normalVector
 * @return A Vector3 representing the world coordinates relative to the specified screen coordinates and a screen plane normal Vector3 (normalised).
 */
export function getWorldCoordFromScreenCoord(screenX: number, screenY: number, worldVector: Vector3, normalVector: Vector3): void {
	return _in(0x00000000, 0xc81d0659, screenX, screenY, worldVector, normalVector); 
}

/**
 * Adds the specified player to the target list for the specified Mumble voice target ID.
 * @param targetId
 * @param serverId
 */
export function mumbleAddVoiceTargetPlayerByServerId(targetId: number, serverId: number): void {
	return _in(0x00000000, 0x25f2b65f, targetId, serverId); 
}

/**
 * A getter for `CWeaponFallOffModifier` damage modifier value in a weapon component.
 * @param componentHash
 * @return A weapon component damage modifier.
 */
export function getWeaponComponentRangeDamageModifier(componentHash: number): number {
	return _in(0x00000000, 0xe134fb8d, componentHash, _r, _rf); 
}

/**
 * Checks if the player is currently muted
 * @param playerSrc
 * @return Whether or not the player is muted
 */
export function mumbleIsPlayerMuted(playerSrc: number): boolean {
	return _in(0x00000000, 0x1d5d50c2, playerSrc, _r, _ri); 
}

/**
 * 
 * @return Talker proximity value.
 */
export function mumbleGetTalkerProximity(): number {
	return _in(0x00000000, 0x84e02a32, _r, _rf); 
}

/**
 * Gets whether the wheel is powered.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * This is a shortcut to a flag in GET_VEHICLE_WHEEL_FLAGS.
 * @param vehicle
 * @param wheelIndex
 */
export function getVehicleWheelIsPowered(vehicle: number, wheelIndex: number): boolean {
	return _in(0x00000000, 0x3ccf1b49, vehicle, wheelIndex, _r, _ri); 
}

/**
 * 
 * @return True if the player has enabled voice chat.
 */
export function mumbleIsActive(): boolean {
	return _in(0x00000000, 0xe820bc10, _r, _ri); 
}

/**
 * Gets the vehicle that is locked on to for the specified vehicle.
 * @param vehicle
 * @return The vehicle that is locked on. 0 returned if no vehicle is locked on.
 */
export function getVehicleLockOnTarget(vehicle: number): number {
	return _in(0x00000000, 0x4a557117, vehicle, _r, _ri); 
}

/**
 * 
 * @param playerSrc
 */
export function networkGetVoiceProximityOverride(playerSrc: string): Vector3 {
	return _in(0x00000000, 0x7a6462f4, playerSrc, _r, _rv); 
}

/**
 * Returns the current NUI focus state previously set with `SET_NUI_FOCUS`.
 * @return True or false.
 */
export function isNuiFocused(): boolean {
	return _in(0x00000000, 0x98545e6d, _r, _ri); 
}

/**
 * Returns whether or not the specific minimap overlay has loaded.
 * @param id
 * @return A boolean indicating load status.
 */
export function hasMinimapOverlayLoaded(id: number): boolean {
	return _in(0x00000000, 0xf7535f32, id, _r, _ri); 
}

/**
 * 
 * @param vehicle
 */
export function isVehicleNeedsToBeHotwired(vehicle: number): boolean {
	return _in(0x00000000, 0xf9933bf4, vehicle, _r, _ri); 
}

/**
 * Requests the commerce data from Tebex for the specified player, including the owned SKUs. Use `IS_PLAYER_COMMERCE_INFO_LOADED` to check if it has loaded.
 * @param playerSrc
 */
export function loadPlayerCommerceDataExt(playerSrc: string): void {
	return _in(0x00000000, 0x7995539e, playerSrc); 
}

/**
 * Adds the specified channel to the target list for the specified Mumble voice target ID.
 * @param targetId
 * @param channel
 */
export function mumbleAddVoiceTargetChannel(targetId: number, channel: number): void {
	return _in(0x00000000, 0x4d386c9e, targetId, channel); 
}

/**
 * Returns the effective handling data of a vehicle as a vector value.
 * Example: `local inertiaMultiplier = GetVehicleHandlingVector(vehicle, 'CHandlingData', 'vecInertiaMultiplier')`
 * @param vehicle
 * @param class_
 * @param fieldName
 * @return An integer.
 */
export function getVehicleHandlingVector(vehicle: number, class_: string, fieldName: string): Vector3 {
	return _in(0x00000000, 0xfb341304, vehicle, class_, fieldName, _r, _rv); 
}

/**
 * 
 * @param vehicle
 */
export function isVehicleWanted(vehicle: number): boolean {
	return _in(0x00000000, 0x0a7daf7c, vehicle, _r, _ri); 
}

/**
 * Create a permanent voice channel.
 * @param id
 */
export function mumbleCreateChannel(id: number): void {
	return _in(0x00000000, 0x262663c5, id); 
}

/**
 * Gets steering angle of a wheel.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * @param vehicle
 * @param wheelIndex
 * @return The steering angle of the wheel, with 0 being straight.
 */
export function getVehicleWheelSteeringAngle(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0xa0867448, vehicle, wheelIndex, _r, _rf); 
}

/**
 * Checks if keyboard input is enabled during NUI focus using `SET_NUI_FOCUS_KEEP_INPUT`.
 * @return True or false.
 */
export function isNuiFocusKeepingInput(): boolean {
	return _in(0x00000000, 0x39c9dc92, _r, _ri); 
}

/**
 * 
 */
export function mumbleClearVoiceChannel(): void {
	return _in(0x00000000, 0xbf847807); 
}

/**
 * Removes the specified player from the user's voice targets.
 * 
 * Performs the opposite operation of [MUMBLE_ADD_VOICE_TARGET_PLAYER](#\_0x32C5355A)
 * @param targetId
 * @param player
 */
export function mumbleRemoveVoiceTargetPlayer(targetId: number, player: number): void {
	return _in(0x00000000, 0x88cd646f, targetId, player); 
}

/**
 * 
 * @param entity
 */
export function networkGetNetworkIdFromEntity(entity: number): number {
	return _in(0x00000000, 0x9e35dab6, entity, _r, _ri); 
}

/**
 * Scope entry for profiler.
 * @param scopeName
 */
export function profilerEnterScope(scopeName: string): void {
	return _in(0x00000000, 0xc795a4a9, scopeName); 
}

/**
 * 
 * @param value
 */
export function mumbleSetTalkerProximity(value: number): void {
	return _in(0x00000000, 0x74e927b0, value); 
}

/**
 * Returns whether or not a browser is created for a specified DUI browser object.
 * @param duiObject
 * @return A boolean indicating TRUE if the browser is created.
 */
export function isDuiAvailable(duiObject: number): boolean {
	return _in(0x00000000, 0x7aac3b4c, duiObject, _r, _ri); 
}

/**
 * Clears players from the target list for the specified Mumble voice target ID.
 * @param targetId
 */
export function mumbleClearVoiceTargetPlayers(targetId: number): void {
	return _in(0x00000000, 0x912e21da, targetId); 
}

/**
 * Adds the specified player to the target list for the specified Mumble voice target ID.
 * @param targetId
 * @param player
 */
export function mumbleAddVoiceTargetPlayer(targetId: number, player: number): void {
	return _in(0x00000000, 0x32c5355a, targetId, player); 
}

/**
 * 
 * @param playerSrc
 * @return A boolean.
 */
export function isPlayerUsingSuperJump(playerSrc: string): boolean {
	return _in(0x00000000, 0xc7d2c20c, playerSrc, _r, _ri); 
}

/**
 * 
 * @param referenceIdentity
 * @param argsSerialized
 * @param argsLength
 * @param retvalLength
 */
export function invokeFunctionReference(referenceIdentity: string, argsSerialized: string, argsLength: number, retvalLength: number): string {
	return _in(0x00000000, 0xe3551879, referenceIdentity, argsSerialized, argsLength, retvalLength, _r, _s); 
}

/**
 * <!-- Native implemented by Disquse. 0x66EE14B2 -->
 * @return Returns true if the full map is currently revealed on the minimap.
Use [`IsBigmapActive`](#\_0xFFF65C63) to check if the minimap is currently expanded or in it's normal state.
 */
export function isBigmapFull(): boolean {
	return _in(0x00000000, 0x66ee14b2, _r, _ri); 
}

/**
 * Sets the current Mumble voice target ID to broadcast voice to.
 * @param targetId
 */
export function mumbleSetVoiceTarget(targetId: number): void {
	return _in(0x00000000, 0x960a4a95, targetId); 
}

/**
 * Replaces the `popgroups` (CPopGroupList) meta file with the file in the specified path.
 * @param path
 */
export function overridePopGroups(path: string): void {
	return _in(0x00000000, 0xd3bc438f, path); 
}

/**
 * 
 * @param object
 */
export function isAceAllowed(object: string): boolean {
	return _in(0x00000000, 0x7ebb9929, object, _r, _ri); 
}

/**
 * Gets whether or not this is the CitizenFX server.
 * @return A boolean value.
 */
export function isDuplicityVersion(): boolean {
	return _in(0x00000000, 0xcf24c52e, _r, _ri); 
}

/**
 * Clears the target list for the specified Mumble voice target ID.
 * @param targetId
 */
export function mumbleClearVoiceTarget(targetId: number): void {
	return _in(0x00000000, 0x8555dcba, targetId); 
}

/**
 * This native checks if the given entity is visible.
 * @param entity
 * @return Returns `true` if the entity is visible, `false` otherwise.
 */
export function isEntityVisible(entity: number): boolean {
	return _in(0x00000000, 0x120b4ed5, entity, _r, _ri); 
}

/**
 * 
 * @param requestData
 */
export function performHttpRequestInternalEx(requestData: number): number {
	return _in(0x00000000, 0x6b171e87, requestData, _r, _ri); 
}

/**
 * Overrides the output volume for a particular player with the specified server id and player name on Mumble. This will also bypass 3D audio and distance calculations. -1.0 to reset the override.
 * @param serverId
 * @param volume
 */
export function mumbleSetVolumeOverrideByServerId(serverId: number, volume: number): void {
	return _in(0x00000000, 0xce8e25b4, serverId, volume); 
}

/**
 * Requests the commerce data for the specified player, including the owned SKUs. Use `IS_PLAYER_COMMERCE_INFO_LOADED` to check if it has loaded.
 * @param playerSrc
 */
export function loadPlayerCommerceData(playerSrc: string): void {
	return _in(0x00000000, 0xa8f63eab, playerSrc); 
}

/**
 * Returns the first owner ID of the specified entity.
 * @param entity
 * @return The server ID of the first entity owner.
 */
export function networkGetFirstEntityOwner(entity: number): number {
	return _in(0x00000000, 0x1e546224, entity, _r, _ri); 
}

/**
 * Removes the specified player from the user's voice targets.
 * 
 * Performs the opposite operation of [MUMBLE_ADD_VOICE_TARGET_PLAYER_BY_SERVER_ID](#\_0x25F2B65F)
 * @param targetId
 * @param serverId
 */
export function mumbleRemoveVoiceTargetPlayerByServerId(targetId: number, serverId: number): void {
	return _in(0x00000000, 0x930bd34b, targetId, serverId); 
}

/**
 * Sets the audio submix ID for a specified player using Mumble 'Native Audio' functionality.
 * @param serverId
 * @param submixId
 */
export function mumbleSetSubmixForServerId(serverId: number, submixId: number): void {
	return _in(0x00000000, 0xfe3a3054, serverId, submixId); 
}

/**
 * 
 * @param vehicle
 * @param wheelIndex
 * @return Float representing size of the rim collider. Not sure what it is used for, probably to detect whether bullets hit rim or tire and puncture it (and to determine size of the wheel when tire is fully blown).
 */
export function getVehicleWheelRimColliderSize(vehicle: number, wheelIndex: number): number {
	return _in(0x00000000, 0xcee21ab2, vehicle, wheelIndex, _r, _rf); 
}

/**
 * Removes the specified voice channel from the user's voice targets.
 * 
 * Performs the opposite operation of [MUMBLE_ADD_VOICE_TARGET_CHANNEL](#\_0x4D386C9E)
 * @param targetId
 * @param channel
 */
export function mumbleRemoveVoiceTargetChannel(targetId: number, channel: number): void {
	return _in(0x00000000, 0x268db867, targetId, channel); 
}

/**
 * 
 * @param vehicle
 */
export function getVehicleWheelType(vehicle: number): number {
	return _in(0x00000000, 0xda58d7ae, vehicle, _r, _ri); 
}

/**
 * Registers a key mapping for the current resource.
 * 
 * See the related [cookbook post](https://cookbook.fivem.net/2020/01/06/using-the-new-console-key-bindings/) for more information.
 * @param commandString
 * @param description
 * @param defaultMapper
 * @param defaultParameter
 */
export function registerKeyMapping(commandString: string, description: string, defaultMapper: string, defaultParameter: string): void {
	return _in(0x00000000, 0xd7664fd1, commandString, description, defaultMapper, defaultParameter); 
}

/**
 * 
 * @param callbackType
 * @param callback
 */
export function registerNuiCallback(callbackType: string, callback: number): void {
	return _in(0x00000000, 0xc59b980c, callbackType, callback); 
}

/**
 * Scope exit for profiler.
 */
export function profilerExitScope(): void {
	return _in(0x00000000, 0xb39ca35c); 
}

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * 
 * Registers a dynamic streaming asset from the server with the GTA streaming module system.
 * @param resourceName
 * @param fileName
 * @param cacheString
 */
export function registerStreamingFileFromCache(resourceName: string, fileName: string, cacheString: string): void {
	return _in(0x00000000, 0xcead2d4b, resourceName, fileName, cacheString); 
}

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * 
 * Removes a handler for changes to a state bag.
 * @param cookie
 */
export function removeStateBagChangeHandler(cookie: number): void {
	return _in(0x00000000, 0xd36be661, cookie); 
}

/**
 * Injects a 'mouse move' event for a DUI object. Coordinates are in browser space.
 * @param duiObject
 * @param x
 * @param y
 */
export function sendDuiMouseMove(duiObject: number, x: number, y: number): void {
	return _in(0x00000000, 0xd9d7a0aa, duiObject, x, y); 
}

/**
 * Changes the Mumble server address to connect to, and reconnects to the new address.
 * @param address
 * @param port
 */
export function mumbleSetServerAddress(address: string, port: number): void {
	return _in(0x00000000, 0xe6eb2cd8, address, port); 
}

/**
 * A getter for [FREEZE_ENTITY_POSITION](#\_0x428CA6DBD1094446).
 * @param entity
 * @return Boolean stating if it is frozen or not.
 */
export function isEntityPositionFrozen(entity: number): boolean {
	return _in(0x00000000, 0xedbe6add, entity, _r, _ri); 
}

/**
 * This native will return true if the user succesfully connected to the voice server.
 * If the user disabled the voice-chat setting it will return false.
 * @return True if the player is connected to a mumble server.
 */
export function mumbleIsConnected(): boolean {
	return _in(0x00000000, 0xb816370a, _r, _ri); 
}

/**
 * Overrides whether or not peds can stand on top of the specified vehicle.
 * 
 * Note this flag is not replicated automatically, you will have to manually do so.
 * @param vehicle
 * @param can
 */
export function overrideVehiclePedsCanStandOnTopFlag(vehicle: number, can: boolean): void {
	return _in(0x00000000, 0x7fa03e76, vehicle, can); 
}

/**
 * Resets parameters which is used by the game for checking is ped needs to fly through windscreen after a crash to default values.
 */
export function resetFlyThroughWindscreenParams(): void {
	return _in(0x00000000, 0x6d712937); 
}

/**
 * 
 * @param player
 * @return Whether or not the player is talking.
 */
export function mumbleIsPlayerTalking(player: number): boolean {
	return _in(0x00000000, 0x33eef97f, player, _r, _ri); 
}

/**
 * Mutes or unmutes the specified player
 * @param playerSrc
 * @param toggle
 */
export function mumbleSetPlayerMuted(playerSrc: number, toggle: boolean): void {
	return _in(0x00000000, 0xcc6c2eb1, playerSrc, toggle); 
}

/**
 * 
 * @param state
 */
export function mumbleSetActive(state: boolean): void {
	return _in(0x00000000, 0xd932a3f3, state); 
}

/**
 * 
 * @param netId
 */
export function networkGetEntityFromNetworkId(netId: number): number {
	return _in(0x00000000, 0x5b912c3f, netId, _r, _ri); 
}

/**
 * Stops listening to the specified channel.
 * @param channel
 */
export function mumbleRemoveVoiceChannelListen(channel: number): void {
	return _in(0x00000000, 0x231523b7, channel); 
}

/**
 * Sets the current output distance. The player will be able to hear other players talking within this distance.
 * @param distance
 */
export function mumbleSetAudioOutputDistance(distance: number): void {
	return _in(0x00000000, 0x74c597d9, distance); 
}

/**
 * 
 * @param channel
 */
export function mumbleSetVoiceChannel(channel: number): void {
	return _in(0x00000000, 0x8737eee8, channel); 
}

/**
 * Registers a specified .gfx file as GFx font library.
 * The .gfx file has to be registered with the streamer already.
 * @param fileName
 */
export function registerFontFile(fileName: string): void {
	return _in(0x00000000, 0x01b3a363, fileName); 
}

/**
 * 
 * @param requestData
 * @param requestDataLength
 */
export function performHttpRequestInternal(requestData: string, requestDataLength: number): number {
	return _in(0x00000000, 0x8e8cc653, requestData, requestDataLength, _r, _ri); 
}

/**
 * Experimental natives, please do not use in a live environment.
 * @param origTxd
 * @param origTxn
 */
export function removeReplaceTexture(origTxd: string, origTxn: string): void {
	return _in(0x00000000, 0xa896b20a, origTxd, origTxn); 
}

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * 
 * Registers a cached resource asset with the resource system, similar to the automatic scanning of the `stream/` folder.
 * @param resourceName
 * @param fileName
 * @return A cache string to pass to `REGISTER_STREAMING_FILE_FROM_CACHE` on the client.
 */
export function registerResourceAsset(resourceName: string, fileName: string): string {
	return _in(0x00000000, 0x9862b266, resourceName, fileName, _r, _s); 
}

/**
 * 
 * @param callbackType
 * @param callback
 */
export function registerRawNuiCallback(callbackType: string, callback: number): void {
	return _in(0x00000000, 0xa8ae9c2f, callbackType, callback); 
}

/**
 * Overrides the output volume for a particular player on Mumble. This will also bypass 3D audio and distance calculations. -1.0 to reset the override.
 * 
 * Set to -1.0 to reset the Volume override.
 * @param player
 * @param volume
 */
export function mumbleSetVolumeOverride(player: number, volume: number): void {
	return _in(0x00000000, 0x61c309e3, player, volume); 
}

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * 
 * Registers a set of entities with the game engine. These should match `CEntityDef` class information from the game.
 * At this time, this function **should not be used in a live environment**.
 * @param factory
 */
export function registerEntities(factory: number): void {
	return _in(0x00000000, 0x410da7d3, factory); 
}

/**
 * Returns the owner ID of the specified entity.
 * @param entity
 * @return On the server, the server ID of the entity owner. On the client, returns the player/slot ID of the entity owner.
 */
export function networkGetEntityOwner(entity: number): number {
	return _in(0x00000000, 0x526fee31, entity, _r, _ri); 
}

/**
 * 
 * @param jsonString
 */
export function sendNuiMessage(jsonString: string): boolean {
	return _in(0x00000000, 0x78608acb, jsonString, _r, _ri); 
}

/**
 * Requests a resource file set with the specified name to be downloaded and mounted on top of the current resource.
 * 
 * Resource file sets are specified in `fxmanifest.lua` with the following syntax:
 * 
 * ```lua
 * file_set 'addon_ui' {
 * 'ui/addon/index.html',
 * 'ui/addon -- [[*.js',
 * }
 * ```
 * 
 * This command will trigger a script error if the request failed.
 * @param setName
 * @return `TRUE` if the set is mounted, `FALSE` if the request is still pending.
 */
export function requestResourceFileSet(setName: string): boolean {
	return _in(0x00000000, 0xe7490533, setName, _r, _ri); 
}

/**
 * Sets the current input distance. The player will be able to talk to other players within this distance.
 * @param distance
 */
export function mumbleSetAudioInputDistance(distance: number): void {
	return _in(0x00000000, 0x1b1052e2, distance); 
}

/**
 * 
 * @param x
 * @param y
 * @return A boolean.
 */
export function setCursorLocation(x: number, y: number): boolean {
	return _in(0x00000000, 0x8a7a8dac, x, y, _r, _ri); 
}

/**
 * <!-- Native implemented by Disquse. 0xFFF65C63 -->
 * 
 * Returns true if the minimap is currently expanded. False if it's the normal minimap state.
 * Use [`IsBigmapFull`](#\_0x66EE14B2) to check if the full map is currently revealed on the minimap.
 * @return A bool indicating if the minimap is currently expanded or normal state.
 */
export function isBigmapActive(): boolean {
	return _in(0x00000000, 0xfff65c63, _r, _ri); 
}

/**
 * 
 * @param callbackType
 */
export function registerNuiCallbackType(callbackType: string): void {
	return _in(0x00000000, 0xcd03cda9, callbackType); 
}

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * 
 * Registers a KVP value as an asset with the GTA streaming module system. This function currently won't work.
 * @param kvsKey
 */
export function registerStreamingFileFromKvs(kvsKey: string): void {
	return _in(0x00000000, 0x1493dcc1, kvsKey); 
}

/**
 * Reads the contents of a text file in a specified resource.
 * If executed on the client, this file has to be included in `files` in the resource manifest.
 * Example: `local data = LoadResourceFile("devtools", "data.json")`
 * @param resourceName
 * @param fileName
 * @return The file contents
 */
export function loadResourceFile(resourceName: string, fileName: string): string {
	return _in(0x00000000, 0x76a9ee1f, resourceName, fileName, _r, _s); 
}

/**
 * Sets the routing bucket for the specified entity.
 * 
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param entity
 * @param bucket
 */
export function setEntityRoutingBucket(entity: number, bucket: number): void {
	return _in(0x00000000, 0x635e5289, entity, bucket); 
}

/**
 * An internal function which allows the current resource's HLL script runtimes to receive state for the specified event.
 * @param eventName
 */
export function registerResourceAsEventHandler(eventName: string): void {
	return _in(0x00000000, 0xd233a168, eventName); 
}

/**
 * 
 * @param playerSrc
 * @param object
 */
export function isPlayerAceAllowed(playerSrc: string, object: string): boolean {
	return _in(0x00000000, 0xdedae23d, playerSrc, object, _r, _ri); 
}

/**
 * Registers a specified font name for use with text draw commands.
 * @param fontName
 * @return An index to use with [SET_TEXT_FONT](#\_0x66E0276CC5F6B9DA) and similar natives.
 */
export function registerFontId(fontName: string): number {
	return _in(0x00000000, 0xacf6d8ee, fontName, _r, _ri); 
}

/**
 * Schedules the specified resource to run a tick as soon as possible, bypassing the server's fixed tick rate.
 * @param resourceName
 */
export function scheduleResourceTick(resourceName: string): void {
	return _in(0x00000000, 0xb88a73ad, resourceName); 
}

/**
 * 
 * @param interiorId
 * @param roomIndex
 * @param flag
 */
export function setInteriorRoomFlag(interiorId: number, roomIndex: number, flag: number): void {
	return _in(0x00000000, 0x5518d60b, interiorId, roomIndex, flag); 
}

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * 
 * Registers a set of archetypes with the game engine. These should match `CBaseArchetypeDef` class information from the game.
 * @param factory
 */
export function registerArchetypes(factory: number): void {
	return _in(0x00000000, 0x3c2f9037, factory); 
}

/**
 * Registers a build task factory for resources.
 * The function should return an object (msgpack map) with the following fields:
 * 
 * ```
 * {
 * // returns whether the specific resource should be built
 * shouldBuild = func(resourceName: string): bool,
 * 
 * // asynchronously start building the specific resource.
 * // call cb when completed
 * build = func(resourceName: string, cb: func(success: bool, status: string): void): void
 * }
 * ```
 * @param factoryId
 * @param factoryFn
 */
export function registerResourceBuildTaskFactory(factoryId: string, factoryFn: number): void {
	return _in(0x00000000, 0x285b43ca, factoryId, factoryFn); 
}

/**
 * Navigates the specified DUI browser to a different URL.
 * @param duiObject
 * @param url
 */
export function setDuiUrl(duiObject: number, url: string): void {
	return _in(0x00000000, 0xf761d9f3, duiObject, url); 
}

/**
 * Requests the specified player to buy the passed SKU. This'll pop up a prompt on the client, which upon acceptance
 * will open the browser prompting further purchase details.
 * @param playerSrc
 * @param skuId
 */
export function requestPlayerCommerceSession(playerSrc: string, skuId: number): void {
	return _in(0x00000000, 0x96f93cce, playerSrc, skuId); 
}

/**
 * Registered commands can be executed by entering them in the client console (this works for client side and server side registered commands). Or by entering them in the server console/through an RCON client (only works for server side registered commands). Or if you use a supported chat resource, like the default one provided in the cfx-server-data repository, then you can enter the command in chat by prefixing it with a `/`.
 * 
 * Commands registered using this function can also be executed by resources, using the [`ExecuteCommand` native](#\_0x561C060B).
 * 
 * The restricted bool is not used on the client side. Permissions can only be checked on the server side, so if you want to limit your command with an ace permission automatically, make it a server command (by registering it in a server script).
 * 
 * **Example result**:
 * 
 * ![](https://i.imgur.com/TaCnG09.png)
 * @param commandName
 * @param handler
 * @param restricted
 */
export function registerCommand(commandName: string, handler: number, restricted: boolean): void {
	return _in(0x00000000, 0x5fa79b0f, commandName, handler, restricted); 
}

/**
 * Resets whether or not peds can stand on top of the specified vehicle.
 * 
 * Note this flag is not replicated automatically, you will have to manually do so.
 * @param vehicle
 */
export function resetVehiclePedsCanStandOnTopFlag(vehicle: number): void {
	return _in(0x00000000, 0xdf62cfe2, vehicle); 
}

/**
 * Restores an overridden ped model personality type to the default value.
 * @param modelHash
 */
export function resetPedModelPersonality(modelHash: number): void {
	return _in(0x00000000, 0x79a12861, modelHash); 
}

/**
 * Sets the volumes for the sound channels in a submix effect.
 * Values can be between 0.0 and 1.0.
 * Channel 5 and channel 6 are not used in voice chat but are believed to be center and LFE channels.
 * Output slot starts at 0 for the first ADD_AUDIO_SUBMIX_OUTPUT call then incremented by 1 on each subsequent call.
 * @param submixId
 * @param outputSlot
 * @param frontLeftVolume
 * @param frontRightVolume
 * @param rearLeftVolume
 * @param rearRightVolume
 * @param channel5Volume
 * @param channel6Volume
 */
export function setAudioSubmixOutputVolumes(submixId: number, outputSlot: number, frontLeftVolume: number, frontRightVolume: number, rearLeftVolume: number, rearRightVolume: number, channel5Volume: number, channel6Volume: number): void {
	return _in(0x00000000, 0x825dc0d1, submixId, outputSlot, frontLeftVolume, frontRightVolume, rearLeftVolume, rearRightVolume, channel5Volume, channel6Volume); 
}

/**
 * Registers a listener for console output messages.
 * @param listener
 */
export function registerConsoleListener(listener: number): void {
	return _in(0x00000000, 0x281b5448, listener); 
}

/**
 * Removes a dry volume from the game session.
 * See CREATE_DRY_VOLUME for more info
 * @param handle
 */
export function removeDryVolume(handle: number): void {
	return _in(0x00000000, 0x7bcaa6e7, handle); 
}

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * 
 * Registers a file from an URL as a streaming asset in the GTA streaming subsystem. This will asynchronously register the asset, and caching is done based on the URL itself - cache headers are ignored.
 * 
 * Use `IS_STREAMING_FILE_READY` to check if the asset has been registered successfully.
 * @param registerAs
 * @param url
 */
export function registerStreamingFileFromUrl(registerAs: string, url: string): void {
	return _in(0x00000000, 0xf44bfb95, registerAs, url); 
}

/**
 * Sets a floating-point parameter for a submix effect.
 * @param submixId
 * @param effectSlot
 * @param paramIndex
 * @param paramValue
 */
export function setAudioSubmixEffectParamFloat(submixId: number, effectSlot: number, paramIndex: number, paramValue: number): void {
	return _in(0x00000000, 0x9a209b3c, submixId, effectSlot, paramIndex, paramValue); 
}

/**
 * Injects a 'mouse up' event for a DUI object. Coordinates are expected to be set using SEND_DUI_MOUSE_MOVE.
 * @param duiObject
 * @param button
 */
export function sendDuiMouseUp(duiObject: number, button: string): void {
	return _in(0x00000000, 0x1d735b93, duiObject, button); 
}

/**
 * Sends a message to the specific DUI root page. This is similar to SEND_NUI_MESSAGE.
 * @param duiObject
 * @param jsonString
 */
export function sendDuiMessage(duiObject: number, jsonString: string): void {
	return _in(0x00000000, 0xcd380da9, duiObject, jsonString); 
}

/**
 * Resets values from the zoom level data by index to defaults from mapzoomdata.meta.
 * @param index
 */
export function resetMapZoomDataLevel(index: number): void {
	return _in(0x00000000, 0x11a5b7ed, index); 
}

/**
 * Injects a 'mouse wheel' event for a DUI object.
 * @param duiObject
 * @param deltaY
 * @param deltaX
 */
export function sendDuiMouseWheel(duiObject: number, deltaY: number, deltaX: number): void {
	return _in(0x00000000, 0x2d62133a, duiObject, deltaY, deltaX); 
}

/**
 * Sends a message to the `loadingScreen` NUI frame, which contains the HTML page referenced in `loadscreen` resources.
 * @param jsonString
 * @return A success value.
 */
export function sendLoadingScreenMessage(jsonString: string): boolean {
	return _in(0x00000000, 0x8bbe6cc0, jsonString, _r, _ri); 
}

/**
 * Sets a clickable button to be displayed in a player's Discord rich presence.
 * @param index
 * @param label
 * @param url
 */
export function setDiscordRichPresenceAction(index: number, label: string, url: string): void {
	return _in(0x00000000, 0xcbbc3fac, index, label, url); 
}

/**
 * Sets whether peds can stand on top of *all* vehicles without falling off.
 * 
 * Note this flag is not replicated automatically, you will have to manually do so.
 * @param flag
 */
export function overridePedsCanStandOnTopFlag(flag: boolean): void {
	return _in(0x00000000, 0x90a9e0b2, flag); 
}

/**
 * Sets an integer parameter for a submix effect.
 * @param submixId
 * @param effectSlot
 * @param paramIndex
 * @param paramValue
 */
export function setAudioSubmixEffectParamInt(submixId: number, effectSlot: number, paramIndex: number, paramValue: number): void {
	return _in(0x00000000, 0x77fae2b8, submixId, effectSlot, paramIndex, paramValue); 
}

/**
 * 
 * @param varName
 * @param value
 */
export function setConvar(varName: string, value: string): void {
	return _in(0x00000000, 0x341b16d2, varName, value); 
}

/**
 * Allows Weapon-Flashlight beams to stay visible while moving. Normally it only stays on while aiming.
 * @param state
 */
export function setFlashLightKeepOnWhileMoving(state: boolean): void {
	return _in(0x00000000, 0x7635b349, state); 
}

/**
 * This native sets the image asset for the discord rich presence implementation.
 * @param assetName
 */
export function setDiscordRichPresenceAsset(assetName: string): void {
	return _in(0x00000000, 0x53dfd530, assetName); 
}

/**
 * Returns true if the profiler is active.
 * @return True or false.
 */
export function profilerIsRecording(): boolean {
	return _in(0x00000000, 0xf8b7d7bb, _r, _ri); 
}

/**
 * Use this native to disable noise suppression and high pass filters.
 * 
 * The possible intents for this are as follows (backticks are used to represent hashes):
 * 
 * | Index | Description |
 * |-|-|
 * | \`speech\` | Default intent |
 * | \`music\` | Disable noise suppression and high pass filter |
 * @param intentHash
 */
export function mumbleSetAudioInputIntent(intentHash: number): void {
	return _in(0x00000000, 0x6383526b, intentHash); 
}

/**
 * This native sets the hover text of the small image asset for the discord rich presence implementation.
 * @param text
 */
export function setDiscordRichPresenceAssetSmallText(text: string): void {
	return _in(0x00000000, 0x35e62b6a, text); 
}

/**
 * This native sets the app id for the discord rich presence implementation.
 * @param appId
 */
export function setDiscordAppId(appId: string): void {
	return _in(0x00000000, 0x6a02254d, appId); 
}

/**
 * Assigns a RadioFX effect to a submix effect slot.
 * 
 * The parameter values for this effect are as follows (backticks are used to represent hashes):
 * 
 * | Index | Type | Description |
 * |-|-|-|
 * | \`enabled\` | int | Enables or disables RadioFX on this DSP. |
 * | \`default\` | int | Sets default parameters for the RadioFX DSP and enables it. |
 * | \`freq_low\` | float |  |
 * | \`freq_hi\` | float |  |
 * | \`fudge\` | float |  |
 * | \`rm_mod_freq\` | float |  |
 * | \`rm_mix\` | float |  |
 * | \`o_freq_lo\` | float |  |
 * | \`o_freq_hi\` | float |  |
 * @param submixId
 * @param effectSlot
 */
export function setAudioSubmixEffectRadioFx(submixId: number, effectSlot: number): void {
	return _in(0x00000000, 0xaaa94d53, submixId, effectSlot); 
}

/**
 * Sets some in-game parameters which is used for checks is ped needs to fly through windscreen after a crash.
 * @param vehMinSpeed
 * @param unkMinSpeed
 * @param unkModifier
 * @param minDamage
 * @return A bool indicating if parameters was set successfully.
 */
export function setFlyThroughWindscreenParams(vehMinSpeed: number, unkMinSpeed: number, unkModifier: number, minDamage: number): boolean {
	return _in(0x00000000, 0x4d3118ed, vehMinSpeed, unkMinSpeed, unkModifier, minDamage, _r, _ri); 
}

/**
 * 
 * @param interiorId
 * @param roomIndex
 * @param bbMinX
 * @param bbMinY
 * @param bbMinZ
 * @param bbMaxX
 * @param bbMaxY
 * @param bbMaxZ
 */
export function setInteriorRoomExtents(interiorId: number, roomIndex: number, bbMinX: number, bbMinY: number, bbMinZ: number, bbMaxX: number, bbMaxY: number, bbMaxZ: number): void {
	return _in(0x00000000, 0x4fdcf51e, interiorId, roomIndex, bbMinX, bbMinY, bbMinZ, bbMaxX, bbMaxY, bbMaxZ); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @param roomTo
 */
export function setInteriorPortalRoomTo(interiorId: number, portalIndex: number, roomTo: number): void {
	return _in(0x00000000, 0x58982680, interiorId, portalIndex, roomTo); 
}

/**
 * Sets whether all tags should group (normal game behavior) or should remain independent and above each ped's respective head when in a vehicle.
 * @param enabled
 */
export function setMpGamerTagsUseVehicleBehavior(enabled: boolean): void {
	return _in(0x00000000, 0x7a27bc93, enabled); 
}

/**
 * the status of default voip system. It affects on `NETWORK_IS_PLAYER_TALKING` and `mp_facial` animation.
 * This function doesn't need to be called every frame, it works like a switcher.
 * @param player
 * @param state
 */
export function setPlayerTalkingOverride(player: number, state: boolean): void {
	return _in(0x00000000, 0xfc02caf6, player, state); 
}

/**
 * Overrides how many real ms are equal to one game minute.
 * A setter for [`GetMillisecondsPerGameMinute`](#\_0x2F8B4D1C595B11DB).
 * @param value
 */
export function setMillisecondsPerGameMinute(value: number): void {
	return _in(0x00000000, 0x36ca2554, value); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @param cornerIndex
 * @param posX
 * @param posY
 * @param posZ
 */
export function setInteriorPortalCornerPosition(interiorId: number, portalIndex: number, cornerIndex: number, posX: number, posY: number, posZ: number): void {
	return _in(0x00000000, 0x87f43553, interiorId, portalIndex, cornerIndex, posX, posY, posZ); 
}

/**
 * Sets the default number plate text pattern for vehicles seen on the local client with the specified plate index as their *default* index (`plateProbabilities` from carvariations).
 * 
 * For consistency, this should be used with the same value on all clients, since vehicles *without* custom text will use a seeded random number generator with this pattern to determine the default plate text.
 * 
 * The default value is `11AAA111`, and using this or a NULL string will revert to the default game RNG.
 * 
 * ### Pattern string format
 * 
 * *   `1` will lead to a random number from 0-9.
 * *   `A` will lead to a random letter from A-Z.
 * *   `.` will lead to a random letter *or* number, with 50% probability of being either.
 * *   `^1` will lead to a literal `1` being emitted.
 * *   `^A` will lead to a literal `A` being emitted.
 * *   Any other character will lead to said character being emitted.
 * *   A string shorter than 8 characters will be padded on the right.
 * @param plateIndex
 * @param pattern
 */
export function setDefaultVehicleNumberPlateTextPattern(plateIndex: number, pattern: string): void {
	return _in(0x00000000, 0x79780fd2, plateIndex, pattern); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @param roomFrom
 */
export function setInteriorPortalRoomFrom(interiorId: number, portalIndex: number, roomFrom: number): void {
	return _in(0x00000000, 0x298fc783, interiorId, portalIndex, roomFrom); 
}

/**
 * 
 * @param enabled
 */
export function setNetworkWalkMode(enabled: boolean): void {
	return _in(0x00000000, 0x55188d2d, enabled); 
}

/**
 * Sets the type for the minimap blip clipping object to be either rectangular or rounded.
 * @param type
 */
export function setMinimapClipType(type: number): void {
	return _in(0x00000000, 0xb8b4490c, type); 
}

/**
 * Used to replicate a server variable onto clients.
 * @param varName
 * @param value
 */
export function setConvarReplicated(varName: string, value: string): void {
	return _in(0x00000000, 0xf292858c, varName, value); 
}

/**
 * 
 * @param tex
 * @param buffer
 * @param length
 */
export function setRuntimeTextureArgbData(tex: number, buffer: string, length: number): boolean {
	return _in(0x00000000, 0x3963d527, tex, buffer, length, _r, _ri); 
}

/**
 * This native sets the small image asset for the discord rich presence implementation.
 * @param assetName
 */
export function setDiscordRichPresenceAssetSmall(assetName: string): void {
	return _in(0x00000000, 0xf61d04c4, assetName); 
}

/**
 * It overrides the default distance culling radius of an entity. Set to `0.0` to reset.
 * If you want to interact with an entity outside of your players' scopes set the radius to a huge number.
 * @param entity
 * @param radius
 */
export function setEntityDistanceCullingRadius(entity: number, radius: number): void {
	return _in(0x00000000, 0xd3a183a3, entity, radius); 
}

/**
 * 
 * @param keepInput
 */
export function setNuiFocusKeepInput(keepInput: boolean): void {
	return _in(0x00000000, 0x3ff5e5f8, keepInput); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @param entityIndex
 * @param flag
 */
export function setInteriorPortalEntityFlag(interiorId: number, portalIndex: number, entityIndex: number, flag: number): void {
	return _in(0x00000000, 0x8349cd76, interiorId, portalIndex, entityIndex, flag); 
}

/**
 * This native sets the hover text of the image asset for the discord rich presence implementation.
 * @param text
 */
export function setDiscordRichPresenceAssetText(text: string): void {
	return _in(0x00000000, 0xb029d2fa, text); 
}

/**
 * 
 * @param varName
 * @param value
 */
export function setConvarServerInfo(varName: string, value: string): void {
	return _in(0x00000000, 0x9338d547, varName, value); 
}

/**
 * Adds a cooldown between instances of moving and then aiming.
 * Can be optionally used to hinder 'speedboosting'
 * To turn off, set value to 0
 * @param value
 */
export function setAimCooldown(value: number): void {
	return _in(0x00000000, 0xa42a3dbf, value); 
}

/**
 * 
 * @param gametypeName
 */
export function setGameType(gametypeName: string): void {
	return _in(0x00000000, 0xf90b7469, gametypeName); 
}

/**
 * A setter for [GET_RESOURCE_KVP_STRING](#\_0x5240DA5A).
 * @param key
 * @param value
 */
export function setResourceKvp(key: string, value: string): void {
	return _in(0x00000000, 0x21c7a35b, key, value); 
}

/**
 * Writes the specified data to a file in the specified resource.
 * Using a length of `-1` will automatically detect the length assuming the data is a C string.
 * @param resourceName
 * @param fileName
 * @param data
 * @param dataLength
 * @return A value indicating if the write succeeded.
 */
export function saveResourceFile(resourceName: string, fileName: string, data: string, dataLength: number): boolean {
	return _in(0x00000000, 0xa09e7e7b, resourceName, fileName, data, dataLength, _r, _ri); 
}

/**
 * Injects a 'mouse down' event for a DUI object. Coordinates are expected to be set using SEND_DUI_MOUSE_MOVE.
 * @param duiObject
 * @param button
 */
export function sendDuiMouseDown(duiObject: number, button: string): void {
	return _in(0x00000000, 0x5d01f191, duiObject, button); 
}

/**
 * Overrides a ped model personality type.
 * @param modelHash
 * @param personalityHash
 */
export function setPedModelPersonality(modelHash: number, personalityHash: number): void {
	return _in(0x00000000, 0x46f6b38b, modelHash, personalityHash); 
}

/**
 * Nonsynchronous [SET_RESOURCE_KVP_FLOAT](#\_0x9ADD2938) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key
 * @param value
 */
export function setResourceKvpFloatNoSync(key: string, value: number): void {
	return _in(0x00000000, 0x3517bfbe, key, value); 
}

/**
 * 
 * @param playerId
 * @param maxStamina
 * @return Did you manage to set the value.
 */
export function setPlayerMaxStamina(playerId: number, maxStamina: number): boolean {
	return _in(0x00000000, 0x35594f67, playerId, maxStamina, _r, _ri); 
}

/**
 * Sets a global handling override for a specific vehicle class. The name is supposed to match the `handlingName` field from handling.meta.
 * Example: `SetHandlingVector('AIRTUG', 'CHandlingData', 'vecCentreOfMassOffset', vector3(0.0, 0.0, -5.0))`
 * @param vehicle
 * @param class_
 * @param fieldName
 * @param value
 */
export function setHandlingVector(vehicle: string, class_: string, fieldName: string, value: Vector3): void {
	return _in(0x00000000, 0x07f9d543, vehicle, class_, fieldName, value); 
}

/**
 * Sets a global handling override for a specific vehicle class. The name is supposed to match the `handlingName` field from handling.meta.
 * Example: `SetHandlingFloat('AIRTUG', 'CHandlingData', 'fSteeringLock', 360.0)`
 * @param vehicle
 * @param class_
 * @param fieldName
 * @param value
 */
export function setHandlingFloat(vehicle: string, class_: string, fieldName: string, value: number): void {
	return _in(0x00000000, 0x090dd01c, vehicle, class_, fieldName, value); 
}

/**
 * Sets the display info for a minimap overlay.
 * @param miniMap
 * @param x
 * @param y
 * @param xScale
 * @param yScale
 * @param alpha
 */
export function setMinimapOverlayDisplay(miniMap: number, x: number, y: number, xScale: number, yScale: number, alpha: number): void {
	return _in(0x00000000, 0x6a48b3ca, miniMap, x, y, xScale, yScale, alpha); 
}

/**
 * 
 * @param interiorId
 * @param portalIndex
 * @param flag
 */
export function setInteriorPortalFlag(interiorId: number, portalIndex: number, flag: number): void {
	return _in(0x00000000, 0x88b2355e, interiorId, portalIndex, flag); 
}

/**
 * 
 * @param vehicle
 * @param gravity
 */
export function setVehicleGravityAmount(vehicle: number, gravity: number): void {
	return _in(0x00000000, 0x1a963e58, vehicle, gravity); 
}

/**
 * 
 * @param vehicle
 * @param level
 */
export function setVehicleOilLevel(vehicle: number, level: number): void {
	return _in(0x00000000, 0x90d1cad1, vehicle, level); 
}

/**
 * 
 * @param handler
 */
export function setHttpHandler(handler: number): void {
	return _in(0x00000000, 0xf5c6330c, handler); 
}

/**
 * Sets whether or not ownership checks should be performed while trying to stow a carriable on a hunting wagon.
 * @param ignore
 */
export function setIgnoreVehicleOwnershipForStowing(ignore: boolean): void {
	return _in(0x00000000, 0x85a10ffd, ignore); 
}

/**
 * Possible Types:
 * 
 * ```
 * 0 = Off,
 * 1 = Regular,
 * 2 = Expanded,
 * 3 = Simple,
 * ```
 * @param type
 */
export function setMinimapType(type: number): void {
	return _in(0x00000000, 0x5fb53015, type); 
}

/**
 * Sets a global handling override for a specific vehicle class. The name is supposed to match the `handlingName` field from handling.meta.
 * @param vehicle
 * @param class_
 * @param fieldName
 * @param value
 */
export function setHandlingInt(vehicle: string, class_: string, fieldName: string, value: number): void {
	return _in(0x00000000, 0x8ab3f46c, vehicle, class_, fieldName, value); 
}

/**
 * Sets the maximum distance at which all tags will be visible and which beyond will not be displayed. Distance is measured from the camera position.
 * @param distance
 */
export function setMpGamerTagsVisibleDistance(distance: number): void {
	return _in(0x00000000, 0xd61676b3, distance); 
}

/**
 * Sets the entity lockdown mode for a specific routing bucket.
 * 
 * Lockdown modes are:
 * 
 * | Mode       | Meaning                                                    |
 * | ---------- | ---------------------------------------------------------- |
 * | `strict`   | No entities can be created by clients at all.              |
 * | `relaxed`  | Only script-owned entities created by clients are blocked. |
 * | `inactive` | Clients can create any entity they want.                   |
 * @param bucketId
 * @param mode
 */
export function setRoutingBucketEntityLockdownMode(bucketId: number, mode: string): void {
	return _in(0x00000000, 0xa0f2201f, bucketId, mode); 
}

/**
 * A setter for [GET_RESOURCE_KVP_INT](#\_0x557B586A).
 * @param key
 * @param value
 */
export function setResourceKvpInt(key: string, value: number): void {
	return _in(0x00000000, 0x06a2b1e8, key, value); 
}

/**
 * 
 * @param vehicle
 * @param level
 */
export function setVehicleFuelLevel(vehicle: number, level: number): void {
	return _in(0x00000000, 0xba970511, vehicle, level); 
}

/**
 * Sets whether or not `SHUTDOWN_LOADING_SCREEN` automatically shuts down the NUI frame for the loading screen. If this is enabled,
 * you will have to manually invoke `SHUTDOWN_LOADING_SCREEN_NUI` whenever you want to hide the NUI loading screen.
 * @param manualShutdown
 */
export function setManualShutdownLoadingScreenNui(manualShutdown: boolean): void {
	return _in(0x00000000, 0x1722c938, manualShutdown); 
}

/**
 * 
 * @param hasFocus
 * @param hasCursor
 */
export function setNuiFocus(hasFocus: boolean, hasCursor: boolean): void {
	return _in(0x00000000, 0x5b98ae30, hasFocus, hasCursor); 
}

/**
 * 
 * @param vehicle
 * @param rpm
 */
export function setVehicleCurrentRpm(vehicle: number, rpm: number): void {
	return _in(0x00000000, 0x2a01a8fc, vehicle, rpm); 
}

/**
 * Sets a pixel in the specified runtime texture. This will have to be committed using `COMMIT_RUNTIME_TEXTURE` to have any effect.
 * @param tex
 * @param x
 * @param y
 * @param r
 * @param g
 * @param b
 * @param a
 */
export function setRuntimeTexturePixel(tex: number, x: number, y: number, r: number, g: number, b: number, a: number): void {
	return _in(0x00000000, 0xab65acee, tex, x, y, r, g, b, a); 
}

/**
 * Replaces the pixel data in a runtime texture with the image data from a file in the current resource, or a data URL.
 * 
 * If the bitmap is a different size compared to the existing texture, it will be resampled.
 * 
 * This command may end up executed asynchronously, and only update the texture data at a later time.
 * @param tex
 * @param fileName
 * @return TRUE for success, FALSE for failure.
 */
export function setRuntimeTextureImage(tex: number, fileName: string): boolean {
	return _in(0x00000000, 0x28fc4ecb, tex, fileName, _r, _ri); 
}

/**
 * 
 * @param mapName
 */
export function setMapName(mapName: string): void {
	return _in(0x00000000, 0xb7ba82dc, mapName); 
}

/**
 * 
 * @param modelHash
 * @param ratePerSecond
 * @param headlightRotation
 * @param invertRotation
 */
export function setModelHeadlightConfiguration(modelHash: number, ratePerSecond: number, headlightRotation: number, invertRotation: boolean): void {
	return _in(0x00000000, 0x7f6b8d75, modelHash, ratePerSecond, headlightRotation, invertRotation); 
}

/**
 * Nonsynchronous [SET_RESOURCE_KVP_INT](#\_0x6A2B1E8) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key
 * @param value
 */
export function setResourceKvpIntNoSync(key: string, value: number): void {
	return _in(0x00000000, 0x26aeb707, key, value); 
}

/**
 * 
 * @param interiorId
 * @param roomIndex
 * @param timecycleHash
 */
export function setInteriorRoomTimecycle(interiorId: number, roomIndex: number, timecycleHash: number): void {
	return _in(0x00000000, 0x31c9a848, interiorId, roomIndex, timecycleHash); 
}

/**
 * Enables or disables whether train doors should be forced open whilst a player is inside the train. This is enabled by default in multiplayer.
 * @param forceOpen
 */
export function setTrainsForceDoorsOpen(forceOpen: boolean): void {
	return _in(0x00000000, 0xd4d1ba63, forceOpen); 
}

/**
 * Sets the culling radius for the specified player.
 * Set to `0.0` to reset.
 * @param playerSrc
 * @param radius
 */
export function setPlayerCullingRadius(playerSrc: string, radius: number): void {
	return _in(0x00000000, 0x8a2fbad4, playerSrc, radius); 
}

/**
 * Sets whether or not the specified routing bucket has automatically-created population enabled.
 * @param bucketId
 * @param mode
 */
export function setRoutingBucketPopulationEnabled(bucketId: number, mode: boolean): void {
	return _in(0x00000000, 0xce51ac2c, bucketId, mode); 
}

/**
 * Nonsynchronous [SET_RESOURCE_KVP](#\_0x21C7A35B) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key
 * @param value
 */
export function setResourceKvpNoSync(key: string, value: string): void {
	return _in(0x00000000, 0x0cf9a2ff, key, value); 
}

/**
 * Sets the height of the vehicle's suspension.
 * This changes the same value set by Suspension in the mod shop.
 * Negatives values raise the car. Positive values lower the car.
 * 
 * This is change is visual only. The collision of the vehicle will not move.
 * @param vehicle
 * @param newHeight
 */
export function setVehicleSuspensionHeight(vehicle: number, newHeight: number): void {
	return _in(0x00000000, 0xb3439a01, vehicle, newHeight); 
}

/**
 * 
 * @param vehicle
 * @param pressure
 */
export function setVehicleTurboPressure(vehicle: number, pressure: number): void {
	return _in(0x00000000, 0x6485615e, vehicle, pressure); 
}

/**
 * Sets a global handling override for a specific vehicle class. The name is supposed to match the `handlingName` field from handling.meta.
 * Example: `SetHandlingField('AIRTUG', 'CHandlingData', 'fSteeringLock', 360.0)`
 * @param vehicle
 * @param class_
 * @param fieldName
 * @param value
 */
export function setHandlingField(vehicle: string, class_: string, fieldName: string, value: any): void {
	return _in(0x00000000, 0xfe8064e3, vehicle, class_, fieldName, value); 
}

/**
 * Disables autoswapping to another weapon when the current weapon runs out of ammo.
 * @param state
 */
export function setWeaponsNoAutoswap(state: boolean): void {
	return _in(0x00000000, 0x02a7b50e, state); 
}

/**
 * Sets a handling override for a specific vehicle. Certain handling flags can only be set globally using `SET_HANDLING_INT`, this might require some experimentation.
 * @param vehicle
 * @param class_
 * @param fieldName
 * @param value
 */
export function setVehicleHandlingInt(vehicle: number, class_: string, fieldName: string, value: number): void {
	return _in(0x00000000, 0xc37f4cf9, vehicle, class_, fieldName, value); 
}

/**
 * 
 * @param name
 * @param path
 * @param data
 */
export function setSnakeoilForEntry(name: string, path: string, data: string): void {
	return _in(0x00000000, 0xa7dd3209, name, path, data); 
}

/**
 * Disables the vehicle from being repaired when a vehicle extra is enabled.
 * @param vehicle
 * @param value
 */
export function setVehicleAutoRepairDisabled(vehicle: number, value: boolean): void {
	return _in(0x00000000, 0x5f3a3574, vehicle, value); 
}

/**
 * Overrides the minimap component data (from `common:/data/ui/frontend.xml`) for a specified component.
 * @param name
 * @param alignX
 * @param alignY
 * @param posX
 * @param posY
 * @param sizeX
 * @param sizeY
 */
export function setMinimapComponentPosition(name: string, alignX: string, alignY: string, posX: number, posY: number, sizeX: number, sizeY: number): void {
	return _in(0x00000000, 0x3e882b23, name, alignX, alignY, posX, posY, sizeX, sizeY); 
}

/**
 * Sets the routing bucket for the specified player.
 * 
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param playerSrc
 * @param bucket
 */
export function setPlayerRoutingBucket(playerSrc: string, bucket: number): void {
	return _in(0x00000000, 0x6504eb38, playerSrc, bucket); 
}

/**
 * A setter for [GET_RESOURCE_KVP_FLOAT](#\_0x35BDCEEA).
 * @param key
 * @param value
 */
export function setResourceKvpFloat(key: string, value: number): void {
	return _in(0x00000000, 0x9add2938, key, value); 
}

/**
 * Sets the ratio that a door is open for on a train.
 * @param train
 * @param doorIndex
 * @param ratio
 */
export function setTrainDoorOpenRatio(train: number, doorIndex: number, ratio: number): void {
	return _in(0x00000000, 0x2468dbe8, train, doorIndex, ratio); 
}

/**
 * 
 * @param vehicle
 * @param temperature
 */
export function setVehicleEngineTemperature(vehicle: number, temperature: number): void {
	return _in(0x00000000, 0x6c93c4a9, vehicle, temperature); 
}

/**
 * Sets the player's rich presence detail state for social platform providers to a specified string.
 * @param presenceState
 */
export function setRichPresence(presenceState: string): void {
	return _in(0x00000000, 0x7bdcbd45, presenceState); 
}

/**
 * Disables the game's built-in auto-reloading.
 * @param state
 */
export function setWeaponsNoAutoreload(state: boolean): void {
	return _in(0x00000000, 0x311150e5, state); 
}

/**
 * A setter for the recoil shake amplitude of a weapon.
 * @param weaponHash
 * @param amplitude
 */
export function setWeaponRecoilShakeAmplitude(weaponHash: number, amplitude: number): void {
	return _in(0x00000000, 0x9864312f, weaponHash, amplitude); 
}

/**
 * Sets values to the zoom level data by index.
 * @param index
 * @param zoomScale
 * @param zoomSpeed
 * @param scrollSpeed
 * @param tilesX
 * @param tilesY
 */
export function setMapZoomDataLevel(index: number, zoomScale: number, zoomSpeed: number, scrollSpeed: number, tilesX: number, tilesY: number): void {
	return _in(0x00000000, 0x447c718e, index, zoomScale, zoomSpeed, scrollSpeed, tilesX, tilesY); 
}

/**
 * Use along with SetVehicleWheelWidth to resize the wheels (this native sets the collider width affecting physics while SetVehicleWheelWidth will change visual width).
 * @param vehicle
 * @param wheelIndex
 * @param value
 */
export function setVehicleWheelTireColliderWidth(vehicle: number, wheelIndex: number, value: number): void {
	return _in(0x00000000, 0x47bd0270, vehicle, wheelIndex, value); 
}

/**
 * 
 * @param vehicle
 * @param time
 */
export function setVehicleAlarmTimeLeft(vehicle: number, time: number): void {
	return _in(0x00000000, 0xc108ee6f, vehicle, time); 
}

/**
 * Toggles whether the usage of [ADD_ROPE](#\_0xE832D760399EB220) should create an underlying CNetworkRopeWorldStateData. By default this is set to false.
 * @param shouldCreate
 */
export function setRopesCreateNetworkWorldState(shouldCreate: boolean): void {
	return _in(0x00000000, 0x0e62fc73, shouldCreate); 
}

/**
 * Adjusts the offset of the specified wheel relative to the wheel's axle center.
 * Needs to be called every frame in order to function properly, as GTA will reset the offset otherwise.
 * This function can be especially useful to set the track width of a vehicle, for example:
 * 
 * ```
 * function SetVehicleFrontTrackWidth(vehicle, width)
 * SetVehicleWheelXOffset(vehicle, 0, -width/2)
 * SetVehicleWheelXOffset(vehicle, 1, width/2)
 * end
 * ```
 * @param vehicle
 * @param wheelIndex
 * @param offset
 */
export function setVehicleWheelXOffset(vehicle: number, wheelIndex: number, offset: number): void {
	return _in(0x00000000, 0x0bd6357d, vehicle, wheelIndex, offset); 
}

/**
 * 
 * @param vehicle
 * @param angle
 */
export function setVehicleSteeringAngle(vehicle: number, angle: number): void {
	return _in(0x00000000, 0xffccc2ea, vehicle, angle); 
}

/**
 * Sets custom vehicle xenon lights color, allowing to use RGB palette. The game will ignore lights color set by [\_SET_VEHICLE_XENON_LIGHTS_COLOR](#\_0xE41033B25D003A07) when custom color is active. This native is not synced between players. Requires xenon lights mod to be set on vehicle.
 * @param vehicle
 * @param red
 * @param green
 * @param blue
 */
export function setVehicleXenonLightsCustomColor(vehicle: number, red: number, green: number, blue: number): void {
	return _in(0x00000000, 0x1683e7f0, vehicle, red, green, blue); 
}

/**
 * The backing function for TriggerLatentClientEvent.
 * @param eventName
 * @param eventTarget
 * @param eventPayload
 * @param payloadLength
 * @param bps
 */
export function triggerLatentClientEventInternal(eventName: string, eventTarget: string, eventPayload: string, payloadLength: number, bps: number): void {
	return _in(0x00000000, 0x70b35890, eventName, eventTarget, eventPayload, payloadLength, bps); 
}

/**
 * Sets vehicle's wheels' size (size is the same for all the wheels, cannot get/set specific wheel of vehicle).
 * Only works on non-default wheels.
 * Returns whether change was successful (can be false if trying to set size for non-default wheels).
 * @param vehicle
 * @param size
 * @return Bool - whether change was successful or not
 */
export function setVehicleWheelSize(vehicle: number, size: number): boolean {
	return _in(0x00000000, 0x53ab5c35, vehicle, size, _r, _ri); 
}

/**
 * Internal function for setting a state bag value.
 * @param bagName
 * @param keyName
 * @param valueData
 * @param valueLength
 * @param replicated
 */
export function setStateBagValue(bagName: string, keyName: string, valueData: string, valueLength: number, replicated: boolean): void {
	return _in(0x00000000, 0x8d50e33a, bagName, keyName, valueData, valueLength, replicated); 
}

/**
 * Sets the flags of a wheel.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * @param vehicle
 * @param wheelIndex
 * @param flags
 */
export function setVehicleWheelFlags(vehicle: number, wheelIndex: number, flags: number): void {
	return _in(0x00000000, 0xd2b9e90d, vehicle, wheelIndex, flags); 
}

/**
 * Set's the ropes length change rate, which is the speed that rope should wind if started.
 * @param rope
 * @param lengthChangeRate
 */
export function setRopeLengthChangeRate(rope: number, lengthChangeRate: number): void {
	return _in(0x00000000, 0x69b680a7, rope, lengthChangeRate); 
}

/**
 * Sets whether the wheel is powered.
 * On all wheel drive cars this works to change which wheels receive power, but if a car's fDriveBiasFront doesn't send power to that wheel, it won't get power anyway. This can be fixed by changing the fDriveBiasFront with SET_VEHICLE_HANDLING_FLOAT.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * This is a shortcut to a flag in SET_VEHICLE_WHEEL_FLAGS.
 * @param vehicle
 * @param wheelIndex
 * @param powered
 */
export function setVehicleWheelIsPowered(vehicle: number, wheelIndex: number, powered: boolean): void {
	return _in(0x00000000, 0xbd5291a0, vehicle, wheelIndex, powered); 
}

/**
 * Enables the editor runtime mode, changing game behavior to track entity metadata.
 * This function supports SDK infrastructure and is not intended to be used directly from your code.
 */
export function enableEditorRuntime(): void {
	return _in(0x00000000, 0xc383871d); 
}

/**
 * Sets a handling override for a specific vehicle. Certain handling flags can only be set globally using `SET_HANDLING_FIELD`, this might require some experimentation.
 * Example: `SetVehicleHandlingField(vehicle, 'CHandlingData', 'fSteeringLock', 360.0)`
 * @param vehicle
 * @param class_
 * @param fieldName
 * @param value
 */
export function setVehicleHandlingField(vehicle: number, class_: string, fieldName: string, value: any): void {
	return _in(0x00000000, 0x2ba40795, vehicle, class_, fieldName, value); 
}

/**
 * 
 * @param vehicle
 * @param clutch
 */
export function setVehicleClutch(vehicle: number, clutch: number): void {
	return _in(0x00000000, 0x2f70aced, vehicle, clutch); 
}

/**
 * Not sure what this changes, probably determines physical rim size in case the tire is blown.
 * @param vehicle
 * @param wheelIndex
 * @param value
 */
export function setVehicleWheelRimColliderSize(vehicle: number, wheelIndex: number, value: number): void {
	return _in(0x00000000, 0xf380e184, vehicle, wheelIndex, value); 
}

/**
 * 
 * @param resourceName
 */
export function startResource(resourceName: string): boolean {
	return _in(0x00000000, 0x29b440dc, resourceName, _r, _ri); 
}

/**
 * 
 * @param playerId
 * @param stamina
 * @return Did you manage to set the value.
 */
export function setPlayerStamina(playerId: number, stamina: number): boolean {
	return _in(0x00000000, 0xa9ec16c7, playerId, stamina, _r, _ri); 
}

/**
 * Shuts down the `loadingScreen` NUI frame, similarly to `SHUTDOWN_LOADING_SCREEN`.
 */
export function shutdownLoadingScreenNui(): void {
	return _in(0x00000000, 0xb9234afb); 
}

/**
 * 
 * @param vehicle
 * @param wheelIndex
 * @param value
 */
export function setVehicleWheelYRotation(vehicle: number, wheelIndex: number, value: number): void {
	return _in(0x00000000, 0xc6c2171f, vehicle, wheelIndex, value); 
}

/**
 * 
 * @param vehicle
 * @param scale
 */
export function setVehicleSteeringScale(vehicle: number, scale: number): void {
	return _in(0x00000000, 0xeb46596f, vehicle, scale); 
}

/**
 * Adds a rectangular blip for the specified coordinates/area.
 * It is recommended to use [SET_BLIP_ROTATION](#\_0xF87683CDF73C3F6E) and [SET_BLIP_COLOUR](#\_0x03D7FB09E75D6B7E) to make the blip not rotate along with the camera.
 * By default, the blip will show as a *regular* blip with the specified color/sprite if it is outside of the minimap view.
 * Example image:
 * ![minimap](https://w.wew.wtf/pdcjig.png)
 * ![big map](https://w.wew.wtf/zgcjcm.png)
 * (Native name is *likely* to actually be ADD_BLIP_FOR_AREA, but due to the usual reasons this can't be confirmed)
 * 
 * **This is the server-side RPC native equivalent of the client native [\_ADD_BLIP_FOR_AREA](?\_0xCE5D0E5E315DB238).**
 * @param x
 * @param y
 * @param z
 * @param width
 * @param height
 * @return A handle to the blip.
 */
export function AddBlipForArea(x: number, y: number, z: number, width: number, height: number): number {
	return _in(0x00000000, 0x6228f159, x, y, z, width, height, _r, _ri); 
}

/**
 * Sets a handling override for a specific vehicle. Certain handling flags can only be set globally using `SET_HANDLING_FLOAT`, this might require some experimentation.
 * Example: `SetVehicleHandlingFloat(vehicle, 'CHandlingData', 'fSteeringLock', 360.0)`
 * @param vehicle
 * @param class_
 * @param fieldName
 * @param value
 */
export function setVehicleHandlingFloat(vehicle: number, class_: string, fieldName: string, value: number): void {
	return _in(0x00000000, 0x488c86d2, vehicle, class_, fieldName, value); 
}

/**
 * Draws an outline around a given entity. This function supports SDK infrastructure and is not intended to be used directly from your code.
 * @param entity
 * @param enabled
 */
export function setEntityDrawOutline(entity: number, enabled: boolean): void {
	return _in(0x00000000, 0x76180407, entity, enabled); 
}

/**
 * Sets the rotation speed of a wheel.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * @param vehicle
 * @param wheelIndex
 * @param speed
 */
export function setVehicleWheelRotationSpeed(vehicle: number, wheelIndex: number, speed: number): void {
	return _in(0x00000000, 0x35ed100d, vehicle, wheelIndex, speed); 
}

/**
 * 
 * @param vehicle
 * @param wheelIndex
 * @param health
 */
export function setVehicleWheelHealth(vehicle: number, wheelIndex: number, health: number): void {
	return _in(0x00000000, 0xb22ecefd, vehicle, wheelIndex, health); 
}

/**
 * 
 * @param vehicle
 * @param gear
 */
export function setVehicleHighGear(vehicle: number, gear: number): void {
	return _in(0x00000000, 0x20b1b3e6, vehicle, gear); 
}

/**
 * Retrieves the map data and entity handles from a specific entity.
 * This function supports SDK infrastructure and is not intended to be used directly from your code.
 * @param entity
 * @param mapdataHandle
 * @param entityHandle
 * @return True if successful, false if not.
 */
export function getEntityMapdataOwner(entity: number, mapdataHandle: number, entityHandle: number): boolean {
	return _in(0x00000000, 0xf6b815c5, entity, mapdataHandle, entityHandle, _r, _ri); 
}

/**
 * Retrieves the map data entity handle.
 * This function supports SDK infrastructure and is not intended to be used directly from your code.
 * @param mapDataHash
 * @param entityInternalIdx
 * @param entityHandle
 * @return True if successful, false if not.
 */
export function getMapdataEntityHandle(mapDataHash: number, entityInternalIdx: number, entityHandle: number): boolean {
	return _in(0x00000000, 0x30aa6911, mapDataHash, entityInternalIdx, entityHandle, _r, _ri); 
}

/**
 * Sets vehicle's wheels' width (width is the same for all the wheels, cannot get/set specific wheel of vehicle).
 * Only works on non-default wheels.
 * Returns whether change was successful (can be false if trying to set width for non-default wheels).
 * @param vehicle
 * @param width
 * @return Bool - whether change was successful or not
 */
export function setVehicleWheelWidth(vehicle: number, width: number): boolean {
	return _in(0x00000000, 0x64c3f1c0, vehicle, width, _r, _ri); 
}

/**
 * Use along with SetVehicleWheelSize to resize the wheels (this native sets the collider size affecting physics while SetVehicleWheelSize will change visual size).
 * @param vehicle
 * @param wheelIndex
 * @param value
 */
export function setVehicleWheelTireColliderSize(vehicle: number, wheelIndex: number, value: number): void {
	return _in(0x00000000, 0xb962d05c, vehicle, wheelIndex, value); 
}

/**
 * Sets a handling override for a specific vehicle. Certain handling flags can only be set globally using `SET_HANDLING_VECTOR`, this might require some experimentation.
 * @param vehicle
 * @param class_
 * @param fieldName
 * @param value
 */
export function setVehicleHandlingVector(vehicle: number, class_: string, fieldName: string, value: Vector3): void {
	return _in(0x00000000, 0x12497890, vehicle, class_, fieldName, value); 
}

/**
 * 
 * @param enabled
 */
export function setTextChatEnabled(enabled: boolean): boolean {
	return _in(0x00000000, 0x97b2f9f8, enabled, _r, _ri); 
}

/**
 * The backing function for TriggerServerEvent.
 * @param eventName
 * @param eventPayload
 * @param payloadLength
 */
export function triggerServerEventInternal(eventName: string, eventPayload: string, payloadLength: number): void {
	return _in(0x00000000, 0x7fdd1128, eventName, eventPayload, payloadLength); 
}

/**
 * Returns the transient map data index for a specified hash.
 * This function supports SDK infrastructure and is not intended to be used directly from your code.
 * @param mapdataHandle
 * @return A transient (non-persistable) index to the requested mapdata, or -1.
 */
export function getMapdataFromHashKey(mapdataHandle: number): number {
	return _in(0x00000000, 0xd29d8edd, mapdataHandle, _r, _ri); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [CLEAR_PED_SECONDARY_TASK](?\_0x176CECF6F920D707).**
 * @param ped
 */
export function clearPedSecondaryTask(ped: number): void {
	return _in(0x00000000, 0xa635f451, ped); 
}

/**
 * Transiently updates the entity with the specified mapdata index and entity index.
 * This function supports SDK infrastructure and is not intended to be used directly from your code.
 * @param mapdata
 * @param entity
 * @param entityDef
 */
export function updateMapdataEntity(mapdata: number, entity: number, entityDef: number): void {
	return _in(0x00000000, 0xfc52cb91, mapdata, entity, entityDef); 
}

/**
 * Returns whether or not the currently executing event was canceled.
 * @return A boolean.
 */
export function wasEventCanceled(): boolean {
	return _in(0x00000000, 0x58382a19, _r, _ri); 
}

/**
 * 
 * @param playerSrc
 * @param reason
 */
export function tempBanPlayer(playerSrc: string, reason: string): void {
	return _in(0x00000000, 0x1e35dbba, playerSrc, reason); 
}

/**
 * Sets power being sent to a wheel.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * @param vehicle
 * @param wheelIndex
 * @param power
 */
export function setVehicleWheelPower(vehicle: number, wheelIndex: number, power: number): void {
	return _in(0x00000000, 0xc6146043, vehicle, wheelIndex, power); 
}

/**
 * Example script: https://pastebin.com/J6XGbkCW
 * 
 * List of known states:
 * 
 * ```
 * 1: Not wheeling.
 * 65: Vehicle is ready to do wheelie (burnouting).
 * 129: Vehicle is doing wheelie.
 * ```
 * @param vehicle
 * @param state
 */
export function setVehicleWheelieState(vehicle: number, state: number): void {
	return _in(0x00000000, 0xeab8db65, vehicle, state); 
}

/**
 * 
 * @param prefix
 * @return A KVP find handle to use with [FIND_KVP](#\_0xBD7BEBC5) and close with [END_FIND_KVP](#\_0xB3210203)
 */
export function startFindKvp(prefix: string): number {
	return _in(0x00000000, 0xdd379006, prefix, _r, _ri); 
}

/**
 * Gets the selected entity at the specified mouse cursor position, and changes the current selection depth. This function supports SDK infrastructure and is not intended to be used directly from your code.
 * @param fracX
 * @param fracY
 * @param hitFlags
 * @param precise
 * @return An entity handle, or zero.
 */
export function selectEntityAtPos(fracX: number, fracY: number, hitFlags: number, precise: boolean): number {
	return _in(0x00000000, 0xafe8d405, fracX, fracY, hitFlags, precise, _r, _ri); 
}

/**
 * 
 * @param resourceName
 */
export function stopResource(resourceName: string): boolean {
	return _in(0x00000000, 0x21783161, resourceName, _r, _ri); 
}

/**
 * A getter for [SET_RESOURCE_KVP](#\_0x21C7A35B), but for a specified resource.
 * @param resource
 * @param key
 * @return A string that contains the value stored in the Kvp or nil/null if none.
 */
export function getExternalKvpString(resource: string, key: string): string {
	return _in(0x00000000, 0x9080363a, resource, key, _r, _s); 
}

/**
 * The backing function for TriggerClientEvent.
 * @param eventName
 * @param eventTarget
 * @param eventPayload
 * @param payloadLength
 */
export function triggerClientEventInternal(eventName: string, eventTarget: string, eventPayload: string, payloadLength: number): void {
	return _in(0x00000000, 0x2f7a49e6, eventName, eventTarget, eventPayload, payloadLength); 
}

/**
 * Overrides a floating point value from `visualsettings.dat` temporarily.
 * @param name
 * @param value
 */
export function setVisualSettingFloat(name: string, value: number): void {
	return _in(0x00000000, 0xd1d31681, name, value); 
}

/**
 * Create a blip with a radius for the specified coordinates (it doesnt create the blip sprite, so you need to use [AddBlipCoords](#\_0xC6F43D0E))
 * Example image:
 * ![example](https://i.imgur.com/9hQl3DB.png)
 * 
 * **This is the server-side RPC native equivalent of the client native [ADD_BLIP_FOR_RADIUS](?\_0x46818D79B1F7499A).**
 * @param posX
 * @param posY
 * @param posZ
 * @param radius
 * @return The blip handle that can be manipulated with every `SetBlip` natives
 */
export function addBlipForRadius(posX: number, posY: number, posZ: number, radius: number): number {
	return _in(0x00000000, 0x4626756c, posX, posY, posZ, radius, _r, _ri); 
}

/**
 * Draws a gizmo. This function supports SDK infrastructure and is not intended to be used directly from your code.
 * 
 * This should be used from JavaScript or another language supporting mutable buffers like ArrayBuffer.
 * 
 * Matrix layout is as follows:
 * 
 * *   Element \[0], \[1] and \[2] should represent the right vector.
 * *   Element \[4], \[5] and \[6] should represent the forward vector.
 * *   Element \[8], \[9] and \[10] should represent the up vector.
 * *   Element \[12], \[13] and \[14] should represent X, Y and Z translation coordinates.
 * *   All other elements should be \[0, 0, 0, 1].
 * @param matrixPtr
 * @param id
 * @return Whether or not the matrix was modified.
 */
export function drawGizmo(matrixPtr: number, id: string): boolean {
	return _in(0x00000000, 0xeb2edca2, matrixPtr, id, _r, _ri); 
}

/**
 * Freezes or unfreezes an entity preventing its coordinates to change by the player if set to `true`. You can still change the entity position using SET_ENTITY_COORDS.
 * 
 * **This is the server-side RPC native equivalent of the client native [FREEZE_ENTITY_POSITION](?\_0x428CA6DBD1094446).**
 * @param entity
 * @param toggle
 */
export function freezeEntityPosition(entity: number, toggle: boolean): void {
	return _in(0x00000000, 0x65c16d57, entity, toggle); 
}

/**
 * A getter for [SET_RESOURCE_KVP_FLOAT](#\_0x9ADD2938), but for a specified resource.
 * @param resource
 * @param key
 * @return A float that contains the value stored in the Kvp or nil/null if none.
 */
export function getExternalKvpFloat(resource: string, key: string): number {
	return _in(0x00000000, 0x3cc98b25, resource, key, _r, _rf); 
}

/**
 * 
 * @param password
 * @param hash
 */
export function verifyPasswordHash(password: string, hash: string): boolean {
	return _in(0x00000000, 0x2e310acd, password, hash, _r, _ri); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [GIVE_WEAPON_TO_PED](?\_0xBF0FD6E56C964FCB).**
 * @param ped
 * @param weaponHash
 * @param ammoCount
 * @param isHidden
 * @param bForceInHand
 */
export function giveWeaponToPed(ped: number, weaponHash: number, ammoCount: number, isHidden: boolean, bForceInHand: boolean): void {
	return _in(0x00000000, 0xc4d88a85, ped, weaponHash, ammoCount, isHidden, bForceInHand); 
}

/**
 * Equivalent to CREATE_VEHICLE, but it uses 'server setter' logic (like the former CREATE_AUTOMOBILE) as a workaround for
 * reliability concerns regarding entity creation RPC.
 * 
 * Unlike CREATE_AUTOMOBILE, this supports other vehicle types as well.
 * @param modelHash
 * @param type
 * @param x
 * @param y
 * @param z
 * @param heading
 * @return A script handle for the vehicle.
 */
export function createVehicleServerSetter(modelHash: number, type: string, x: number, y: number, z: number, heading: number): number {
	return _in(0x00000000, 0x6ae51d4b, modelHash, type, x, y, z, heading, _r, _ri); 
}

/**
 * Will unregister and cleanup a registered NUI callback handler.
 * 
 * Use along side the REGISTER_RAW_NUI_CALLBACK native.
 * @param callbackType
 */
export function unregisterRawNuiCallback(callbackType: string): void {
	return _in(0x00000000, 0x7fb46432, callbackType); 
}

/**
 * Sets brake pressure of a wheel.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * Normal values around 1.0f
 * @param vehicle
 * @param wheelIndex
 * @param pressure
 */
export function setVehicleWheelBrakePressure(vehicle: number, wheelIndex: number, pressure: number): void {
	return _in(0x00000000, 0xe80f4e31, vehicle, wheelIndex, pressure); 
}

/**
 * Enters cursor mode, suppressing mouse movement to the game and displaying a mouse cursor instead. This function supports
 * SDK infrastructure and is not intended to be used directly from your code.
 */
export function enterCursorMode(): void {
	return _in(0x00000000, 0x0780da86); 
}

/**
 * The backing function for TriggerLatentServerEvent.
 * @param eventName
 * @param eventPayload
 * @param payloadLength
 * @param bps
 */
export function triggerLatentServerEventInternal(eventName: string, eventPayload: string, payloadLength: number, bps: number): void {
	return _in(0x00000000, 0x128737ea, eventName, eventPayload, payloadLength, bps); 
}

/**
 * Leaves cursor mode. This function supports SDK infrastructure and is not intended to be used directly from your code.
 */
export function leaveCursorMode(): void {
	return _in(0x00000000, 0xadecf19e); 
}

/**
 * This native removes a specified weapon from your selected ped.
 * Weapon Hashes: pastebin.com/0wwDZgkF
 * Example:
 * C#:
 * Function.Call(Hash.REMOVE_WEAPON_FROM_PED, Game.Player.Character, 0x99B507EA);
 * C++:
 * WEAPON::REMOVE_WEAPON_FROM_PED(PLAYER::PLAYER_PED_ID(), 0x99B507EA);
 * The code above removes the knife from the player.
 * 
 * **This is the server-side RPC native equivalent of the client native [REMOVE_WEAPON_FROM_PED](?\_0x4899CB088EDF59B8).**
 * @param ped
 * @param weaponHash
 */
export function removeWeaponFromPed(ped: number, weaponHash: number): void {
	return _in(0x00000000, 0x9c37f220, ped, weaponHash); 
}

/**
 * Scans the resources in the specified resource root. This function is only available in the 'monitor mode' process and is
 * not available for user resources.
 * @param rootPath
 * @param callback
 */
export function scanResourceRoot(rootPath: string, callback: number): void {
	return _in(0x00000000, 0x636f097f, rootPath, callback); 
}

/**
 * Clear a ped's tasks. Stop animations and other tasks created by scripts.
 * 
 * **This is the server-side RPC native equivalent of the client native [CLEAR_PED_TASKS](?\_0xE1EF3C1216AFF2CD).**
 * @param ped
 */
export function clearPedTasks(ped: number): void {
	return _in(0x00000000, 0xde3316ab, ped); 
}

/**
 * NativeDB Added Parameter 4: BOOL p3
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_AMMO](?\_0x14E56BC5B5DB6A19).**
 * @param ped
 * @param weaponHash
 * @param ammo
 */
export function setPedAmmo(ped: number, weaponHash: number, ammo: number): void {
	return _in(0x00000000, 0xbf90df1a, ped, weaponHash, ammo); 
}

/**
 * Sets color for entity outline. `255, 0, 255, 255` by default.
 * @param red
 * @param green
 * @param blue
 * @param alpha
 */
export function setEntityDrawOutlineColor(red: number, green: number, blue: number, alpha: number): void {
	return _in(0x00000000, 0xb41a56c2, red, green, blue, alpha); 
}

/**
 * Sets whether or not the weather should be owned by the network subsystem.
 * 
 * To be able to use [\_SET_WEATHER_TYPE_TRANSITION](#\_0x578C752848ECFA0C), this has to be set to false.
 * @param network
 */
export function setWeatherOwnedByNetwork(network: boolean): void {
	return _in(0x00000000, 0x2703d582, network); 
}

/**
 * Prints 'structured trace' data to the server `file descriptor 3` channel. This is not generally useful outside of
 * server monitoring utilities.
 * @param jsonString
 */
export function printStructuredTrace(jsonString: string): void {
	return _in(0x00000000, 0x90892ded, jsonString); 
}

/**
 * Equivalent of [START_FIND_KVP](#\_0xDD379006), but for another resource than the current one.
 * @param resourceName
 * @param prefix
 * @return A KVP find handle to use with [FIND_KVP](#\_0xBD7BEBC5) and close with [END_FIND_KVP](#\_0xB3210203)
 */
export function startFindExternalKvp(resourceName: string, prefix: string): number {
	return _in(0x00000000, 0x8f2eecc3, resourceName, prefix, _r, _ri); 
}

/**
 * Sets an entity's matrix. Arguments are in the same order as with GET_ENTITY_MATRIX.
 * @param entity
 * @param forwardX
 * @param forwardY
 * @param forwardZ
 * @param rightX
 * @param rightY
 * @param rightZ
 * @param upX
 * @param upY
 * @param upZ
 * @param atX
 * @param atY
 * @param atZ
 */
export function setEntityMatrix(entity: number, forwardX: number, forwardY: number, forwardZ: number, rightX: number, rightY: number, rightZ: number, upX: number, upY: number, upZ: number, atX: number, atY: number, atZ: number): void {
	return _in(0x00000000, 0x0fb0639b, entity, forwardX, forwardY, forwardZ, rightX, rightY, rightZ, upX, upY, upZ, atX, atY, atZ); 
}

/**
 * A getter for [SET_RESOURCE_KVP_INT](#\_0x6A2B1E8), but for a specified resource.
 * @param resource
 * @param key
 * @return A int that contains the value stored in the Kvp or nil/null if none.
 */
export function getExternalKvpInt(resource: string, key: string): number {
	return _in(0x00000000, 0x12b8d689, resource, key, _r, _ri); 
}

/**
 * Returns mapdata's entity matrix. This function supports SDK infrastructure and is not intended to be used directly from your code.
 * 
 * This should be used from JavaScript or another language supporting mutable buffers like ArrayBuffer.
 * 
 * Matrix layout is as follows:
 * 
 * *   Element \[0], \[1] and \[2] should represent the right vector.
 * *   Element \[4], \[5] and \[6] should represent the forward vector.
 * *   Element \[8], \[9] and \[10] should represent the up vector.
 * *   Element \[12], \[13] and \[14] should represent X, Y and Z translation coordinates.
 * *   All other elements should be \[0, 0, 0, 1].
 * @param mapDataHash
 * @param entityInternalIdx
 * @param matrixPtr
 * @return Whether or not the matrix was retrieved.
 */
export function getMapdataEntityMatrix(mapDataHash: number, entityInternalIdx: number, matrixPtr: number): boolean {
	return _in(0x00000000, 0x2c3cda93, mapDataHash, entityInternalIdx, matrixPtr, _r, _ri); 
}

/**
 * Sets the traction vector length of a wheel.
 * Max number of wheels can be retrieved with the native GET_VEHICLE_NUMBER_OF_WHEELS.
 * @param vehicle
 * @param wheelIndex
 * @param length
 */
export function setVehicleWheelTractionVectorLength(vehicle: number, wheelIndex: number, length: number): void {
	return _in(0x00000000, 0x85c85a3a, vehicle, wheelIndex, length); 
}

/**
 * The backing function for TriggerEvent.
 * @param eventName
 * @param eventPayload
 * @param payloadLength
 */
export function triggerEventInternal(eventName: string, eventPayload: string, payloadLength: number): void {
	return _in(0x00000000, 0x91310870, eventName, eventPayload, payloadLength); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [GIVE_WEAPON_COMPONENT_TO_PED](?\_0xD966D51AA5B28BB9).**
 * @param ped
 * @param weaponHash
 * @param componentHash
 */
export function giveWeaponComponentToPed(ped: number, weaponHash: number, componentHash: number): void {
	return _in(0x00000000, 0x3e1e286d, ped, weaponHash, componentHash); 
}

/**
 * Resets mapdata entity transform matrix to its original state.
 * This function supports SDK infrastructure and is not intended to be used directly from your code.
 * @param mapDataHash
 * @param entityInternalIdx
 * @return True if successful, false if not.
 */
export function resetMapdataEntityMatrix(mapDataHash: number, entityInternalIdx: number): boolean {
	return _in(0x00000000, 0x8143fa4f, mapDataHash, entityInternalIdx, _r, _ri); 
}

/**
 * Disables the editor runtime mode, changing game behavior to not track entity metadata.
 * This function supports SDK infrastructure and is not intended to be used directly from your code.
 */
export function disableEditorRuntime(): void {
	return _in(0x00000000, 0xb1622b17); 
}

/**
 * Create a blip that by default is red (enemy), you can use [SET_BLIP_AS_FRIENDLY](#\_0xC6F43D0E) to make it blue (friend).\
 * Can be used for objects, vehicles and peds.
 * Example of enemy:
 * ![enemy](https://i.imgur.com/fl78svv.png)
 * Example of friend:
 * ![friend](https://i.imgur.com/Q16ho5d.png)
 * 
 * **This is the server-side RPC native equivalent of the client native [ADD_BLIP_FOR_ENTITY](?\_0x5CDE92C702A8FCE7).**
 * @param entity
 * @return A blip handle.
 */
export function addBlipForEntity(entity: number): number {
	return _in(0x00000000, 0x30822554, entity, _r, _ri); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_ENTITY_ROTATION](?\_0x8524A8B0171D5E07).**
 * @param entity
 * @param pitch
 * @param roll
 * @param yaw
 * @param rotationOrder
 * @param p5
 */
export function setEntityRotation(entity: number, pitch: number, roll: number, yaw: number, rotationOrder: number, p5: boolean): void {
	return _in(0x00000000, 0x0a345efe, entity, pitch, roll, yaw, rotationOrder, p5); 
}

/**
 * Sets variant of shader that will be used to draw entity outline.
 * 
 * Variants are:
 * 
 * *   **0**: Default value, gauss shader.
 * *   **1**: 2px wide solid color outline.
 * *   **2**: Fullscreen solid color except for entity.
 * @param shader
 */
export function setEntityDrawOutlineShader(shader: number): void {
	return _in(0x00000000, 0x5261a01a, shader); 
}

/**
 * Removes the blip from your map.
 * 
 * **This is the server-side RPC native equivalent of the client native [REMOVE_BLIP](?\_0x86A652570E5F25DD).**
 * @param blip
 */
export function removeBlip(blip: number): void {
	return _in(0x00000000, 0xd8c3c1cd, blip); 
}

/**
 * Creates a ped (biped character, pedestrian, actor) with the specified model at the specified position and heading.
 * This ped will initially be owned by the creating script as a mission entity, and the model should be loaded already
 * (e.g. using REQUEST_MODEL).
 * 
 * **This is the server-side RPC native equivalent of the client native [CREATE_PED](?\_0xD49F9B0955C367DE).**
 * @param pedType
 * @param modelHash
 * @param x
 * @param y
 * @param z
 * @param heading
 * @param isNetwork
 * @param bScriptHostPed
 * @return A script handle (fwScriptGuid index) for the ped, or `0` if the ped failed to be created.
 */
export function createPed(pedType: number, modelHash: number, x: number, y: number, z: number, heading: number, isNetwork: boolean, bScriptHostPed: boolean): number {
	return _in(0x00000000, 0x0389ef71, pedType, modelHash, x, y, z, heading, isNetwork, bScriptHostPed, _r, _ri); 
}

/**
 * Sets the selected vehicle's colors to their default value (specific variant specified using the colorCombination parameter).
 * Range of possible values for colorCombination is currently unknown, I couldn't find where these values are stored either (Disquse's guess was vehicles.meta but I haven't seen it in there.)
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_COLOUR_COMBINATION](?\_0x33E8CD3322E2FE31).**
 * @param vehicle
 * @param colorCombination
 */
export function setVehicleColourCombination(vehicle: number, colorCombination: number): void {
	return _in(0x00000000, 0xa557aead, vehicle, colorCombination); 
}

/**
 * Gets the selected entity at the current mouse cursor position, and changes the current selection depth. This function supports SDK infrastructure and is not intended to be used directly from your code.
 * @param hitFlags
 * @param precise
 * @return An entity handle, or zero.
 */
export function selectEntityAtCursor(hitFlags: number, precise: boolean): number {
	return _in(0x00000000, 0x3dd8130f, hitFlags, precise, _r, _ri); 
}

/**
 * Set the heading of an entity in degrees also known as "Yaw".
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_ENTITY_HEADING](?\_0x8E2530AA8ADA980E).**
 * @param entity
 * @param heading
 */
export function setEntityHeading(entity: number, heading: number): void {
	return _in(0x00000000, 0xe0ff064d, entity, heading); 
}

/**
 * p1, p2, p3 are RGB values for color (255,0,0 for Red, ect)
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_CUSTOM_SECONDARY_COLOUR](?\_0x36CED73BFED89754).**
 * @param vehicle
 * @param r
 * @param g
 * @param b
 */
export function setVehicleCustomSecondaryColour(vehicle: number, r: number, g: number, b: number): void {
	return _in(0x00000000, 0x9d77259e, vehicle, r, g, b); 
}

/**
 * Sets Ped Default Clothes
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_DEFAULT_COMPONENT_VARIATION](?\_0x45EEE61580806D63).**
 * @param ped
 */
export function setPedDefaultComponentVariation(ped: number): void {
	return _in(0x00000000, 0xc866a984, ped); 
}

/**
 * Creates a vehicle with the specified model at the specified position. This vehicle will initially be owned by the creating
 * script as a mission entity, and the model should be loaded already (e.g. using REQUEST_MODEL).
 * 
 * ```
 * NativeDB Added Parameter 8: BOOL p7
 * ```
 * 
 * **This is the server-side RPC native equivalent of the client native [CREATE_VEHICLE](?\_0xAF35D0D2583051B0).**
 * @param modelHash
 * @param x
 * @param y
 * @param z
 * @param heading
 * @param isNetwork
 * @param netMissionEntity
 * @return A script handle (fwScriptGuid index) for the vehicle, or `0` if the vehicle failed to be created.
 */
export function createVehicle(modelHash: number, x: number, y: number, z: number, heading: number, isNetwork: boolean, netMissionEntity: boolean): number {
	return _in(0x00000000, 0xdd75460a, modelHash, x, y, z, heading, isNetwork, netMissionEntity, _r, _ri); 
}

/**
 * This native is used to set component variation on a ped. Components, drawables and textures IDs are related to the ped model.
 * 
 * ### MP Freemode list of components
 * 
 * **0**: Face\
 * **1**: Mask\
 * **2**: Hair\
 * **3**: Torso\
 * **4**: Leg\
 * **5**: Parachute / bag\
 * **6**: Shoes\
 * **7**: Accessory\
 * **8**: Undershirt\
 * **9**: Kevlar\
 * **10**: Badge\
 * **11**: Torso 2
 * 
 * ### Related and useful natives
 * 
 * [GET_NUMBER_OF_PED_DRAWABLE_VARIATIONS](#\_0x27561561732A7842)\
 * [GET_NUMBER_OF_PED_TEXTURE_VARIATIONS](#\_0x8F7156A3142A6BAD)
 * [List of component/props ID](gtaxscripting.blogspot.com/2016/04/gta-v-peds-component-and-props.html) of player_two with examples
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_COMPONENT_VARIATION](?\_0x262B14F48D29DE80).**
 * @param ped
 * @param componentId
 * @param drawableId
 * @param textureId
 * @param paletteId
 */
export function setPedComponentVariation(ped: number, componentId: number, drawableId: number, textureId: number, paletteId: number): void {
	return _in(0x00000000, 0xd4f7b05c, ped, componentId, drawableId, textureId, paletteId); 
}

/**
 * Sets the dirt level of the passed vehicle.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_DIRT_LEVEL](?\_0x79D3B596FE44EE8B).**
 * @param vehicle
 * @param dirtLevel
 */
export function setVehicleDirtLevel(vehicle: number, dirtLevel: number): void {
	return _in(0x00000000, 0x2b39128b, vehicle, dirtLevel); 
}

/**
 * Applies an Item from a PedDecorationCollection to a ped. These include tattoos and shirt decals.
 * collection - PedDecorationCollection filename hash
 * overlay - Item name hash
 * Example:
 * Entry inside "mpbeach_overlays.xml" -
 * <Item>
 * <uvPos x="0.500000" y="0.500000" />
 * <scale x="0.600000" y="0.500000" />
 * <rotation value="0.000000" />
 * <nameHash>FM_Hair_Fuzz</nameHash>
 * <txdHash>mp_hair_fuzz</txdHash>
 * <txtHash>mp_hair_fuzz</txtHash>
 * <zone>ZONE_HEAD</zone>
 * <type>TYPE_TATTOO</type>
 * <faction>FM</faction>
 * <garment>All</garment>
 * <gender>GENDER_DONTCARE</gender>
 * <award />
 * <awardLevel />
 * </Item>
 * Code:
 * PED::\_0x5F5D1665E352A839(PLAYER::PLAYER_PED_ID(), MISC::GET_HASH_KEY("mpbeach_overlays"), MISC::GET_HASH_KEY("fm_hair_fuzz"))
 * 
 * **This is the server-side RPC native equivalent of the client native [ADD_PED_DECORATION_FROM_HASHES](?\_0x5F5D1665E352A839).**
 * @param ped
 * @param collection
 * @param overlay
 */
export function addPedDecorationFromHashes(ped: number, collection: number, overlay: number): void {
	return _in(0x00000000, 0x70559ac7, ped, collection, overlay); 
}

/**
 * Creates an object (prop) with the specified model at the specified position, offset on the Z axis by the radius of the object's model.
 * This object will initially be owned by the creating script as a mission entity, and the model should be loaded already (e.g. using REQUEST_MODEL).
 * 
 * **This is the server-side RPC native equivalent of the client native [CREATE_OBJECT](?\_0x509D5878EB39E842).**
 * @param modelHash
 * @param x
 * @param y
 * @param z
 * @param isNetwork
 * @param netMissionEntity
 * @param doorFlag
 * @return A script handle (fwScriptGuid index) for the object, or `0` if the object failed to be created.
 */
export function createObject(modelHash: number, x: number, y: number, z: number, isNetwork: boolean, netMissionEntity: boolean, doorFlag: boolean): number {
	return _in(0x00000000, 0x2f7aa05c, modelHash, x, y, z, isNetwork, netMissionEntity, doorFlag, _r, _ri); 
}

/**
 * Returns the transient entity index for a specified mapdata/entity pair.
 * This function supports SDK infrastructure and is not intended to be used directly from your code.
 * @param mapdata
 * @param entity
 * @return A transient (non-persistable) index to the requested entity, or -1.
 */
export function getEntityIndexFromMapdata(mapdata: number, entity: number): number {
	return _in(0x00000000, 0xee43540d, mapdata, entity, _r, _ri); 
}

/**
 * PED::SET_PED_RESET_FLAG(PLAYER::PLAYER_PED_ID(), 240, 1);
 * Known values:
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_RESET_FLAG](?\_0xC1E8A365BF3B29F2).**
 * @param ped
 * @param flagId
 * @param doReset
 */
export function setPedResetFlag(ped: number, flagId: number, doReset: boolean): void {
	return _in(0x00000000, 0xcff6ff66, ped, flagId, doReset); 
}

/**
 * Note that the third parameter(denoted as z) is "up and down" with positive numbers encouraging upwards movement.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_ENTITY_VELOCITY](?\_0x1C99BB7B6E96D16F).**
 * @param entity
 * @param x
 * @param y
 * @param z
 */
export function setEntityVelocity(entity: number, x: number, y: number, z: number): void {
	return _in(0x00000000, 0xff5a1988, entity, x, y, z); 
}

/**
 * Return variable is never used in R\*'s scripts.
 * Not sure what p2 does. It seems like it would be a time judging by it's usage in R\*'s scripts, but didn't seem to affect anything in my testings.
 * x, y, and z are coordinates, most likely to where the ped will fall.
 * p7 is probably the force of the fall, but untested, so I left the variable name the same.
 * p8 to p13 are always 0f in R\*'s scripts.
 * (Simplified) Example of the usage of the function from R\*'s scripts:
 * ped::set_ped_to_ragdoll_with_fall(ped, 1500, 2000, 1, -entity::get_entity_forward_vector(ped), 1f, 0f, 0f, 0f, 0f, 0f, 0f);
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_TO_RAGDOLL_WITH_FALL](?\_0xD76632D99E4966C8).**
 * @param ped
 * @param time
 * @param p2
 * @param ragdollType
 * @param x
 * @param y
 * @param z
 * @param p7
 * @param p8
 * @param p9
 * @param p10
 * @param p11
 * @param p12
 * @param p13
 */
export function setPedToRagdollWithFall(ped: number, time: number, p2: number, ragdollType: number, x: number, y: number, z: number, p7: number, p8: number, p9: number, p10: number, p11: number, p12: number, p13: number): void {
	return _in(0x00000000, 0xfa12e286, ped, time, p2, ragdollType, x, y, z, p7, p8, p9, p10, p11, p12, p13); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [CREATE_PED_INSIDE_VEHICLE](?\_0x7DD959874C1FD534).**
 * @param vehicle
 * @param pedType
 * @param modelHash
 * @param seat
 * @param isNetwork
 * @param bScriptHostPed
 */
export function createPedInsideVehicle(vehicle: number, pedType: number, modelHash: number, seat: number, isNetwork: boolean, bScriptHostPed: boolean): number {
	return _in(0x00000000, 0x3000f092, vehicle, pedType, modelHash, seat, isNetwork, bScriptHostPed, _r, _ri); 
}

/**
 * This executes at the same as speed as PLAYER::SET_PLAYER_WANTED_LEVEL(player, 0, false);
 * PLAYER::GET_PLAYER_WANTED_LEVEL(player); executes in less than half the time. Which means that it's worth first checking if the wanted level needs to be cleared before clearing. However, this is mostly about good code practice and can important in other situations. The difference in time in this example is negligible.
 * 
 * **This is the server-side RPC native equivalent of the client native [CLEAR_PLAYER_WANTED_LEVEL](?\_0xB302540597885499).**
 * @param player
 */
export function clearPlayerWantedLevel(player: number): void {
	return _in(0x00000000, 0x54ea5bcc, player); 
}

/**
 * ```
 * Used for freemode (online) characters.
 * Called after SET_PED_HEAD_OVERLAY().
 * ```
 * 
 * **Note:**
 * You may need to call [`SetPedHeadBlendData`](#0x9414E18B9434C2FE) prior to calling this native in order for it to work.
 * 
 * **This is the server-side RPC native equivalent of the client native [\_SET_PED_HEAD_OVERLAY_COLOR](?\_0x497BF74A7B9CB952).**
 * @param ped
 * @param overlayID
 * @param colorType
 * @param colorID
 * @param secondColorID
 */
export function SetPedHeadOverlayColor(ped: number, overlayID: number, colorType: number, colorID: number, secondColorID: number): void {
	return _in(0x00000000, 0x78935a27, ped, overlayID, colorType, colorID, secondColorID); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_PED_INTO_VEHICLE](?\_0xF75B0D629E1C063D).**
 * @param ped
 * @param vehicle
 * @param seatIndex
 */
export function setPedIntoVehicle(ped: number, vehicle: number, seatIndex: number): void {
	return _in(0x00000000, 0x07500c79, ped, vehicle, seatIndex); 
}

/**
 * Applies a force to the specified entity.
 * **List of force types (p1)**:
 * 
 * ```
 * public enum ForceType
 * {
 * MinForce = 0,
 * MaxForceRot = 1,
 * MinForce2 = 2,
 * MaxForceRot2 = 3,
 * ForceNoRot = 4,
 * ForceRotPlusForce = 5
 * }
 * ```
 * 
 * Research/documentation on the gtaforums can be found [here](https://gtaforums.com/topic/885669-precisely-define-object-physics/) and [here](https://gtaforums.com/topic/887362-apply-forces-and-momentums-to-entityobject/).
 * 
 * **This is the server-side RPC native equivalent of the client native [APPLY_FORCE_TO_ENTITY](?\_0xC5F68BE9613E2D18).**
 * @param entity
 * @param forceType
 * @param x
 * @param y
 * @param z
 * @param offX
 * @param offY
 * @param offZ
 * @param boneIndex
 * @param isDirectionRel
 * @param ignoreUpVec
 * @param isForceRel
 * @param p12
 * @param p13
 */
export function applyForceToEntity(entity: number, forceType: number, x: number, y: number, z: number, offX: number, offY: number, offZ: number, boneIndex: number, isDirectionRel: boolean, ignoreUpVec: boolean, isForceRel: boolean, p12: boolean, p13: boolean): void {
	return _in(0x00000000, 0xc1c0855a, entity, forceType, x, y, z, offX, offY, offZ, boneIndex, isDirectionRel, ignoreUpVec, isForceRel, p12, p13); 
}

/**
 * <!--
 * _loc1_.map((name, idx) => `| ${idx} | ${name} | ![${name}](https://runtime.fivem.net/blips/${name}.svg) |`).join('\n')
 * -->
 * 
 * Sets the displayed sprite for a specific blip.
 * There's a [list of sprites](https://docs.fivem.net/game-references/blips/) on the FiveM documentation site.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_BLIP_SPRITE](?\_0xDF735600A4696DAF).**
 * @param blip
 * @param spriteId
 */
export function setBlipSprite(blip: number, spriteId: number): void {
	return _in(0x00000000, 0x8dbbb0b9, blip, spriteId); 
}

/**
 * List of component/props ID
 * gtaxscripting.blogspot.com/2016/04/gta-v-peds-component-and-props.html
 * 
 * **This is the server-side RPC native equivalent of the client native [CLEAR_PED_PROP](?\_0x0943E5B8E078E76E).**
 * @param ped
 * @param propId
 */
export function clearPedProp(ped: number, propId: number): void {
	return _in(0x00000000, 0x2d23d743, ped, propId); 
}

/**
 * p2 often set to 1000.0 in the decompiled scripts.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_BODY_HEALTH](?\_0xB77D05AC8C78AADB).**
 * @param vehicle
 * @param value
 */
export function setVehicleBodyHealth(vehicle: number, value: number): void {
	return _in(0x00000000, 0x920c2517, vehicle, value); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_PED_CAN_RAGDOLL](?\_0xB128377056A54E2A).**
 * @param ped
 * @param toggle
 */
export function setPedCanRagdoll(ped: number, toggle: boolean): void {
	return _in(0x00000000, 0xcf1384c4, ped, toggle); 
}

/**
 * ```
 * OverlayID ranges from 0 to 12, index from 0 to _GET_NUM_OVERLAY_VALUES(overlayID)-1, and opacity from 0.0 to 1.0.
 * overlayID       Part                  Index, to disable
 * 0               Blemishes             0 - 23, 255
 * 1               Facial Hair           0 - 28, 255
 * 2               Eyebrows              0 - 33, 255
 * 3               Ageing                0 - 14, 255
 * 4               Makeup                0 - 74, 255
 * 5               Blush                 0 - 6, 255
 * 6               Complexion            0 - 11, 255
 * 7               Sun Damage            0 - 10, 255
 * 8               Lipstick              0 - 9, 255
 * 9               Moles/Freckles        0 - 17, 255
 * 10              Chest Hair            0 - 16, 255
 * 11              Body Blemishes        0 - 11, 255
 * 12              Add Body Blemishes    0 - 1, 255
 * ```
 * 
 * **Note:**
 * You may need to call [`SetPedHeadBlendData`](#0x9414E18B9434C2FE) prior to calling this native in order for it to work.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_HEAD_OVERLAY](?\_0x48F44967FA05CC1E).**
 * @param ped
 * @param overlayID
 * @param index
 * @param opacity
 */
export function setPedHeadOverlay(ped: number, overlayID: number, index: number, opacity: number): void {
	return _in(0x00000000, 0xd28dba90, ped, overlayID, index, opacity); 
}

/**
 * Immediately stops the pedestrian from whatever it's doing. The difference between this and [CLEAR_PED_TASKS](#\_0xE1EF3C1216AFF2CD) is that this one teleports the ped but does not change the position of the ped.
 * 
 * **This is the server-side RPC native equivalent of the client native [CLEAR_PED_TASKS_IMMEDIATELY](?\_0xAAA34F8A7CB32098).**
 * @param ped
 */
export function clearPedTasksImmediately(ped: number): void {
	return _in(0x00000000, 0xbc045625, ped); 
}

/**
 * Creates a blip for the specified coordinates. You can use `SET_BLIP_` natives to change the blip.
 * 
 * **This is the server-side RPC native equivalent of the client native [ADD_BLIP_FOR_COORD](?\_0x5A039BB0BCA604B6).**
 * @param x
 * @param y
 * @param z
 * @return A blip handle.
 */
export function addBlipForCoord(x: number, y: number, z: number): number {
	return _in(0x00000000, 0xc6f43d0e, x, y, z, _r, _ri); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [REMOVE_WEAPON_COMPONENT_FROM_PED](?\_0x1E8BE90C74FB4C09).**
 * @param ped
 * @param weaponHash
 * @param componentHash
 */
export function removeWeaponComponentFromPed(ped: number, weaponHash: number, componentHash: number): void {
	return _in(0x00000000, 0x412aa00d, ped, weaponHash, componentHash); 
}

/**
 * Flags:
 * SPC_AMBIENT_SCRIPT = (1 << 1),
 * SPC_CLEAR_TASKS = (1 << 2),
 * SPC_REMOVE_FIRES = (1 << 3),
 * SPC_REMOVE_EXPLOSIONS = (1 << 4),
 * SPC_REMOVE_PROJECTILES = (1 << 5),
 * SPC_DEACTIVATE_GADGETS = (1 << 6),
 * SPC_REENABLE_CONTROL_ON_DEATH = (1 << 7),
 * SPC_LEAVE_CAMERA_CONTROL_ON = (1 << 8),
 * SPC_ALLOW_PLAYER_DAMAGE = (1 << 9),
 * SPC_DONT_STOP_OTHER_CARS_AROUND_PLAYER = (1 << 10),
 * SPC_PREVENT_EVERYBODY_BACKOFF = (1 << 11),
 * SPC_ALLOW_PAD_SHAKE = (1 << 12)
 * See: https://alloc8or.re/gta5/doc/enums/eSetPlayerControlFlag.txt
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PLAYER_CONTROL](?\_0x8D32347D6D4C40A2).**
 * @param player
 * @param bHasControl
 * @param flags
 */
export function setPlayerControl(player: number, bHasControl: boolean, flags: number): void {
	return _in(0x00000000, 0xd17afcd8, player, bHasControl, flags); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_ALARM](?\_0xCDE5E70C1DDB954C).**
 * @param vehicle
 * @param state
 */
export function setVehicleAlarm(vehicle: number, state: boolean): void {
	return _in(0x00000000, 0x24877d84, vehicle, state); 
}

/**
 * Flags from decompiled scripts:
 * 0 = normal exit and closes door.
 * 1 = normal exit and closes door.
 * 16 = teleports outside, door kept closed.  (This flag does not seem to work for the front seats in buses, NPCs continue to exit normally)
 * 64 = normal exit and closes door, maybe a bit slower animation than 0.
 * 256 = normal exit but does not close the door.
 * 4160 = ped is throwing himself out, even when the vehicle is still.
 * 262144 = ped moves to passenger seat first, then exits normally
 * Others to be tried out: 320, 512, 131072.
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_LEAVE_VEHICLE](?\_0xD3DBCE61A490BE02).**
 * @param ped
 * @param vehicle
 * @param flags
 */
export function taskLeaveVehicle(ped: number, vehicle: number, flags: number): void {
	return _in(0x00000000, 0x7b1141c6, ped, vehicle, flags); 
}

/**
 * Sets the coordinates (world position) for a specified entity, offset by the radius of the entity on the Z axis.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_ENTITY_COORDS](?\_0x06843DA7060A026B).**
 * @param entity
 * @param xPos
 * @param yPos
 * @param zPos
 * @param alive
 * @param deadFlag
 * @param ragdollFlag
 * @param clearArea
 */
export function setEntityCoords(entity: number, xPos: number, yPos: number, zPos: number, alive: boolean, deadFlag: boolean, ragdollFlag: boolean, clearArea: boolean): void {
	return _in(0x00000000, 0xdf70b41b, entity, xPos, yPos, zPos, alive, deadFlag, ragdollFlag, clearArea); 
}

/**
 * Creates an object (prop) with the specified model centered at the specified position.
 * This object will initially be owned by the creating script as a mission entity, and the model should be loaded already (e.g. using REQUEST_MODEL).
 * 
 * **This is the server-side RPC native equivalent of the client native [CREATE_OBJECT_NO_OFFSET](?\_0x9A294B2138ABB884).**
 * @param modelHash
 * @param x
 * @param y
 * @param z
 * @param isNetwork
 * @param netMissionEntity
 * @param doorFlag
 * @return A script handle (fwScriptGuid index) for the object, or `0` if the object failed to be created.
 */
export function createObjectNoOffset(modelHash: number, x: number, y: number, z: number, isNetwork: boolean, netMissionEntity: boolean, doorFlag: boolean): number {
	return _in(0x00000000, 0x58040420, modelHash, x, y, z, isNetwork, netMissionEntity, doorFlag, _r, _ri); 
}

/**
 * // Source GTA VC miss2 leak, matching constants for 0/2/4, testing
 * // They use 10 in am_mp_property_int, don't know what it does atm.
 * enum eCarLock {
 * CARLOCK_NONE = 0,
 * CARLOCK_UNLOCKED = 1,
 * CARLOCK_LOCKED = 2,
 * CARLOCK_LOCKOUT_PLAYER_ONLY = 3,
 * CARLOCK_LOCKED_PLAYER_INSIDE = 4,
 * CARLOCK_LOCKED_INITIALLY = 5,
 * CARLOCK_FORCE_SHUT_DOORS = 6,
 * CARLOCK_LOCKED_BUT_CAN_BE_DAMAGED = 7
 * };
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_DOORS_LOCKED](?\_0xB664292EAECF7FA6).**
 * @param vehicle
 * @param doorLockStatus
 */
export function setVehicleDoorsLocked(vehicle: number, doorLockStatus: number): void {
	return _in(0x00000000, 0x4cdd35d0, vehicle, doorLockStatus); 
}

/**
 * It's similar to the one above, except the first 6 floats let you specify the initial position and rotation of the task. (Ped gets teleported to the position).
 * [Animations list](https://alexguirre.github.io/animations-list/)
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_PLAY_ANIM_ADVANCED](?\_0x83CDB10EA29B370B).**
 * @param ped
 * @param animDict
 * @param animName
 * @param posX
 * @param posY
 * @param posZ
 * @param rotX
 * @param rotY
 * @param rotZ
 * @param animEnterSpeed
 * @param animExitSpeed
 * @param duration
 * @param flag
 * @param animTime
 * @param p14
 * @param p15
 */
export function taskPlayAnimAdvanced(ped: number, animDict: string, animName: string, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, animEnterSpeed: number, animExitSpeed: number, duration: number, flag: any, animTime: number, p14: any, p15: any): void {
	return _in(0x00000000, 0x3ddeb0e6, ped, animDict, animName, posX, posY, posZ, rotX, rotY, rotZ, animEnterSpeed, animExitSpeed, duration, flag, animTime, p14, p15); 
}

/**
 * Sets the armor of the specified ped.
 * ped: The Ped to set the armor of.
 * amount: A value between 0 and 100 indicating the value to set the Ped's armor to.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_ARMOUR](?\_0xCEA04D83135264CC).**
 * @param ped
 * @param amount
 */
export function setPedArmour(ped: number, amount: number): void {
	return _in(0x00000000, 0x4e3a0cc4, ped, amount); 
}

/**
 * For more info please refer to [this](https://gtaforums.com/topic/858970-all-gtao-face-ids-pedset-ped-head-blend-data-explained) topic.
 * **Other information:**
 * IDs start at zero and go Male Non-DLC, Female Non-DLC, Male DLC, and Female DLC.</br>
 * This native function is often called prior to calling natives such as:
 * 
 * *   [`SetPedHairColor`](#0xBB43F090)
 * *   [`SetPedHeadOverlayColor`](#0x78935A27)
 * *   [`SetPedHeadOverlay`](#0xD28DBA90)
 * *   [`SetPedFaceFeature`](#0x6C8D4458)
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_HEAD_BLEND_DATA](?\_0x9414E18B9434C2FE).**
 * @param ped
 * @param shapeFirstID
 * @param shapeSecondID
 * @param shapeThirdID
 * @param skinFirstID
 * @param skinSecondID
 * @param skinThirdID
 * @param shapeMix
 * @param skinMix
 * @param thirdMix
 * @param isParent
 */
export function setPedHeadBlendData(ped: number, shapeFirstID: number, shapeSecondID: number, shapeThirdID: number, skinFirstID: number, skinSecondID: number, skinThirdID: number, shapeMix: number, skinMix: number, thirdMix: number, isParent: boolean): void {
	return _in(0x00000000, 0x60746b88, ped, shapeFirstID, shapeSecondID, shapeThirdID, skinFirstID, skinSecondID, skinThirdID, shapeMix, skinMix, thirdMix, isParent); 
}

/**
 * Used for freemode (online) characters.
 * 
 * **This is the server-side RPC native equivalent of the client native [\_SET_PED_HAIR_COLOR](?\_0x4CFFC65454C93A49).**
 * @param ped
 * @param colorID
 * @param highlightColorID
 */
export function SetPedHairColor(ped: number, colorID: number, highlightColorID: number): void {
	return _in(0x00000000, 0xbb43f090, ped, colorID, highlightColorID); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [TASK_EVERYONE_LEAVE_VEHICLE](?\_0x7F93691AB4B92272).**
 * @param vehicle
 */
export function taskEveryoneLeaveVehicle(vehicle: number): void {
	return _in(0x00000000, 0xc1971f30, vehicle); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_NUMBER_PLATE_TEXT](?\_0x95A88F0B409CDA47).**
 * @param vehicle
 * @param plateText
 */
export function setVehicleNumberPlateText(vehicle: number, plateText: string): void {
	return _in(0x00000000, 0x400f9556, vehicle, plateText); 
}

/**
 * Set the model for a specific Player. Note that this will destroy the current Ped for the Player and create a new one, any reference to the old ped will be invalid after calling this.
 * As per usual, make sure to request the model first and wait until it has loaded.
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PLAYER_MODEL](?\_0x00A1CADD00108836).**
 * @param player
 * @param model
 */
export function setPlayerModel(player: number, model: number): void {
	return _in(0x00000000, 0x774a4c54, player, model); 
}

/**
 * Simply sets you as invincible (Health will not deplete).
 * Use 0x733A643B5B0C53C1 instead if you want Ragdoll enabled, which is equal to:
 * \*(DWORD \*)(playerPedAddress + 0x188) |= (1 << 9);
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PLAYER_INVINCIBLE](?\_0x239528EACDC3E7DE).**
 * @param player
 * @param toggle
 */
export function setPlayerInvincible(player: number, toggle: boolean): void {
	return _in(0x00000000, 0xdfb9a2a2, player, toggle); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [SET_CURRENT_PED_WEAPON](?\_0xADF692B254977C0C).**
 * @param ped
 * @param weaponHash
 * @param bForceInHand
 */
export function setCurrentPedWeapon(ped: number, weaponHash: number, bForceInHand: boolean): void {
	return _in(0x00000000, 0xb8278882, ped, weaponHash, bForceInHand); 
}

/**
 * p1 is always 0 in R\* scripts; and a quick disassembly seems to indicate that p1 is unused.
 * List of component/props ID:
 * gtaxscripting.blogspot.com/2016/04/gta-v-peds-component-and-props.html
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_RANDOM_COMPONENT_VARIATION](?\_0xC8A9481A01E63C28).**
 * @param ped
 * @param p1
 */
export function setPedRandomComponentVariation(ped: number, p1: number): void {
	return _in(0x00000000, 0x4111ba46, ped, p1); 
}

/**
 * [Animations list](https://alexguirre.github.io/animations-list/)
 * 
 * ```
 * float blendInSpeed > normal speed is 8.0f
 * ----------------------
 * float blendOutSpeed > normal speed is 8.0f
 * ----------------------
 * int duration: time in millisecond
 * ----------------------
 * -1 _ _ _ _ _ _ _> Default (see flag)
 * 0 _ _ _ _ _ _ _ > Not play at all
 * Small value _ _ > Slow down animation speed
 * Other _ _ _ _ _ > freeze player control until specific time (ms) has
 * _ _ _ _ _ _ _ _ _ passed. (No effect if flag is set to be
 * _ _ _ _ _ _ _ _ _ controllable.)
 * int flag:
 * ----------------------
 * enum eAnimationFlags
 * {
 * ANIM_FLAG_NORMAL = 0,
 * ANIM_FLAG_REPEAT = 1,
 * ANIM_FLAG_STOP_LAST_FRAME = 2,
 * ANIM_FLAG_UPPERBODY = 16,
 * ANIM_FLAG_ENABLE_PLAYER_CONTROL = 32,
 * ANIM_FLAG_CANCELABLE = 120,
 * };
 * Odd number : loop infinitely
 * Even number : Freeze at last frame
 * Multiple of 4: Freeze at last frame but controllable
 * 01 to 15 > Full body
 * 10 to 31 > Upper body
 * 32 to 47 > Full body > Controllable
 * 48 to 63 > Upper body > Controllable
 * ...
 * 001 to 255 > Normal
 * 256 to 511 > Garbled
 * ...
 * playbackRate:
 * values are between 0.0 and 1.0
 * lockX:
 * 0 in most cases 1 for rcmepsilonism8 and rcmpaparazzo_3
 * > 1 for mini@sprunk
 * lockY:
 * 0 in most cases
 * 1 for missfam5_yoga, missfra1mcs_2_crew_react
 * lockZ:
 * 0 for single player
 * Can be 1 but only for MP
 * ```
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_PLAY_ANIM](?\_0xEA47FE3719165B94).**
 * @param ped
 * @param animDictionary
 * @param animationName
 * @param blendInSpeed
 * @param blendOutSpeed
 * @param duration
 * @param flag
 * @param playbackRate
 * @param lockX
 * @param lockY
 * @param lockZ
 */
export function taskPlayAnim(ped: number, animDictionary: string, animationName: string, blendInSpeed: number, blendOutSpeed: number, duration: number, flag: number, playbackRate: number, lockX: boolean, lockY: boolean, lockZ: boolean): void {
	return _in(0x00000000, 0x5ab552c6, ped, animDictionary, animationName, blendInSpeed, blendOutSpeed, duration, flag, playbackRate, lockX, lockY, lockZ); 
}

/**
 * Used for freemode (online) characters.
 * Indices:
 * 
 * 1.  black
 * 2.  very light blue/green
 * 3.  dark blue
 * 4.  brown
 * 5.  darker brown
 * 6.  light brown
 * 7.  blue
 * 8.  light blue
 * 9.  pink
 * 10. yellow
 * 11. purple
 * 12. black
 * 13. dark green
 * 14. light brown
 * 15. yellow/black pattern
 * 16. light colored spiral pattern
 * 17. shiny red
 * 18. shiny half blue/half red
 * 19. half black/half light blue
 * 20. white/red perimter
 * 21. green snake
 * 22. red snake
 * 23. dark blue snake
 * 24. dark yellow
 * 25. bright yellow
 * 26. all black
 * 27. red small pupil
 * 28. devil blue/black
 * 29. white small pupil
 * 30. glossed over
 * 
 * **This is the server-side RPC native equivalent of the client native [\_SET_PED_EYE_COLOR](?\_0x50B56988B170AFDF).**
 * @param ped
 * @param index
 */
export function SetPedEyeColor(ped: number, index: number): void {
	return _in(0x00000000, 0xec09db1b, ped, index); 
}

/**
 * example from fm_mission_controller
 * TASK::TASK_GO_TO_COORD_ANY_MEANS(l\_649, sub_f7e86(-1, 0), 1.0, 0, 0, 786603, 0xbf800000);
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_GO_TO_COORD_ANY_MEANS](?\_0x5BC448CB78FA3E88).**
 * @param ped
 * @param x
 * @param y
 * @param z
 * @param speed
 * @param p5
 * @param p6
 * @param walkingStyle
 * @param p8
 */
export function taskGoToCoordAnyMeans(ped: number, x: number, y: number, z: number, speed: number, p5: any, p6: boolean, walkingStyle: number, p8: number): void {
	return _in(0x00000000, 0xf91df93b, ped, x, y, z, speed, p5, p6, walkingStyle, p8); 
}

/**
 * speed 1.0 = walk, 2.0 = run
 * p5 1 = normal, 3 = teleport to vehicle, 8 = normal/carjack ped from seat, 16 = teleport directly into vehicle
 * p6 is always 0
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_ENTER_VEHICLE](?\_0xC20E50AA46D09CA8).**
 * @param ped
 * @param vehicle
 * @param timeout
 * @param seatIndex
 * @param speed
 * @param flag
 * @param p6
 */
export function taskEnterVehicle(ped: number, vehicle: number, timeout: number, seatIndex: number, speed: number, flag: number, p6: any): void {
	return _in(0x00000000, 0xb8689b4e, ped, vehicle, timeout, seatIndex, speed, flag, p6); 
}

/**
 * p4/p5: Unusued in TU27
 * 
 * ### Ragdoll Types
 * 
 * **0**: CTaskNMRelax
 * **1**: CTaskNMScriptControl: Hardcoded not to work in networked environments.
 * **Else**: CTaskNMBalance
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_TO_RAGDOLL](?\_0xAE99FB955581844A).**
 * @param ped
 * @param time1
 * @param time2
 * @param ragdollType
 * @param p4
 * @param p5
 * @param p6
 */
export function setPedToRagdoll(ped: number, time1: number, time2: number, ragdollType: number, p4: boolean, p5: boolean, p6: boolean): void {
	return _in(0x00000000, 0x83cb5052, ped, time1, time2, ragdollType, p4, p5, p6); 
}

/**
 * Flags are the same flags used in [`TASK_LEAVE_VEHICLE`](#\_0xD3DBCE61A490BE02)
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_LEAVE_ANY_VEHICLE](?\_0x504D54DF3F6F2247).**
 * @param ped
 * @param p1
 * @param flags
 */
export function taskLeaveAnyVehicle(ped: number, p1: number, flags: number): void {
	return _in(0x00000000, 0xdbdd79fa, ped, p1, flags); 
}

/**
 * Firing Pattern Hash Information: https://pastebin.com/Px036isB
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_SHOOT_AT_COORD](?\_0x46A6CC01E0826106).**
 * @param ped
 * @param x
 * @param y
 * @param z
 * @param duration
 * @param firingPattern
 */
export function taskShootAtCoord(ped: number, x: number, y: number, z: number, duration: number, firingPattern: number): void {
	return _in(0x00000000, 0x601c22e3, ped, x, y, z, duration, firingPattern); 
}

/**
 * Example:
 * TASK::TASK_DRIVE_BY(l\_467\[1 -- [[22]] ], PLAYER::PLAYER_PED_ID(), 0, 0.0, 0.0, 2.0, 300.0, 100, 0, ${firing_pattern_burst_fire_driveby});
 * Needs working example. Doesn't seem to do anything.
 * I marked p2 as targetVehicle as all these shooting related tasks seem to have that in common.
 * I marked p6 as distanceToShoot as if you think of GTA's Logic with the native SET_VEHICLE_SHOOT natives, it won't shoot till it gets within a certain distance of the target.
 * I marked p7 as pedAccuracy as it seems it's mostly 100 (Completely Accurate), 75, 90, etc. Although this could be the ammo count within the gun, but I highly doubt it. I will change this comment once I find out if it's ammo count or not.
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_DRIVE_BY](?\_0x2F8AF0E82773A171).**
 * @param driverPed
 * @param targetPed
 * @param targetVehicle
 * @param targetX
 * @param targetY
 * @param targetZ
 * @param distanceToShoot
 * @param pedAccuracy
 * @param p8
 * @param firingPattern
 */
export function taskDriveBy(driverPed: number, targetPed: number, targetVehicle: number, targetX: number, targetY: number, targetZ: number, distanceToShoot: number, pedAccuracy: number, p8: boolean, firingPattern: number): void {
	return _in(0x00000000, 0x2b84d1c4, driverPed, targetPed, targetVehicle, targetX, targetY, targetZ, distanceToShoot, pedAccuracy, p8, firingPattern); 
}

/**
 * Parameter `p1` does not seem to be used or referenced in game binaries.\
 * **Note:** When called for networked entities, a `CRemoveAllWeaponsEvent` will be created per request.
 * 
 * **This is the server-side RPC native equivalent of the client native [REMOVE_ALL_PED_WEAPONS](?\_0xF25DF915FA38C5F3).**
 * @param ped
 * @param p1
 */
export function removeAllPedWeapons(ped: number, p1: boolean): void {
	return _in(0x00000000, 0xa44ce817, ped, p1); 
}

/**
 * This native is used to set prop variation on a ped. Components, drawables and textures IDs are related to the ped model.
 * 
 * ### MP Freemode list of props
 * 
 * **0**: Hat\
 * **1**: Glass\
 * **2**: Ear\
 * **6**: Watch\
 * **7**: Bracelet
 * 
 * ### Related and useful natives
 * 
 * [GET_NUMBER_OF_PED_PROP_DRAWABLE_VARIATIONS](#\_0x5FAF9754E789FB47)\
 * [GET_NUMBER_OF_PED_PROP_TEXTURE_VARIATIONS](#\_0xA6E7F1CEB523E171)
 * [List of component/props ID](https://gtaxscripting.blogspot.com/2016/04/gta-v-peds-component-and-props.html) of player_two with examples
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_PROP_INDEX](?\_0x93376B65A266EB5F).**
 * @param ped
 * @param componentId
 * @param drawableId
 * @param textureId
 * @param attach
 */
export function setPedPropIndex(ped: number, componentId: number, drawableId: number, textureId: number, attach: boolean): void {
	return _in(0x00000000, 0x0829f2e2, ped, componentId, drawableId, textureId, attach); 
}

/**
 * colorPrimary & colorSecondary are the paint indexes for the vehicle.
 * For a list of valid paint indexes, view: pastebin.com/pwHci0xK
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_COLOURS](?\_0x4F1D4BE3A7F24601).**
 * @param vehicle
 * @param colorPrimary
 * @param colorSecondary
 */
export function setVehicleColours(vehicle: number, colorPrimary: number, colorSecondary: number): void {
	return _in(0x00000000, 0x57f24253, vehicle, colorPrimary, colorSecondary); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [TASK_GO_STRAIGHT_TO_COORD](?\_0xD76B57B44F1E6F8B).**
 * @param ped
 * @param x
 * @param y
 * @param z
 * @param speed
 * @param timeout
 * @param targetHeading
 * @param distanceToSlide
 */
export function taskGoStraightToCoord(ped: number, x: number, y: number, z: number, speed: number, timeout: number, targetHeading: number, distanceToSlide: number): void {
	return _in(0x00000000, 0x80a9e7a7, ped, x, y, z, speed, timeout, targetHeading, distanceToSlide); 
}

/**
 * List of component/props ID
 * gtaxscripting.blogspot.com/2016/04/gta-v-peds-component-and-props.html
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_RANDOM_PROPS](?\_0xC44AA05345C992C6).**
 * @param ped
 */
export function setPedRandomProps(ped: number): void {
	return _in(0x00000000, 0xe3318e0e, ped); 
}

/**
 * See eDoorId declared in [`SET_VEHICLE_DOOR_SHUT`](#\_0x93D9BD300D7789E5)
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_DOOR_BROKEN](?\_0xD4D4F6A4AB575A33).**
 * @param vehicle
 * @param doorIndex
 * @param deleteDoor
 */
export function setVehicleDoorBroken(vehicle: number, doorIndex: number, deleteDoor: boolean): void {
	return _in(0x00000000, 0x8147fea7, vehicle, doorIndex, deleteDoor); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [TASK_WARP_PED_INTO_VEHICLE](?\_0x9A7D091411C5F684).**
 * @param ped
 * @param vehicle
 * @param seatIndex
 */
export function taskWarpPedIntoVehicle(ped: number, vehicle: number, seatIndex: number): void {
	return _in(0x00000000, 0x65d4a35d, ped, vehicle, seatIndex); 
}

/**
 * Sets the various freemode face features, e.g. nose length, chin shape.
 * **Indexes (From 0 to 19):**
 * Parentheses indicate morph scale/direction as in (-1.0 to 1.0)
 * 
 * *   **0**: Nose Width (Thin/Wide)
 * *   **1**: Nose Peak (Up/Down)
 * *   **2**: Nose Length (Long/Short)
 * *   **3**: Nose Bone Curveness (Crooked/Curved)
 * *   **4**: Nose Tip (Up/Down)
 * *   **5**: Nose Bone Twist (Left/Right)
 * *   **6**: Eyebrow (Up/Down)
 * *   **7**: Eyebrow (In/Out)
 * *   **8**: Cheek Bones (Up/Down)
 * *   **9**: Cheek Sideways Bone Size (In/Out)
 * *   **10**: Cheek Bones Width (Puffed/Gaunt)
 * *   **11**: Eye Opening (Both) (Wide/Squinted)
 * *   **12**: Lip Thickness (Both) (Fat/Thin)
 * *   **13**: Jaw Bone Width (Narrow/Wide)
 * *   **14**: Jaw Bone Shape (Round/Square)
 * *   **15**: Chin Bone (Up/Down)
 * *   **16**: Chin Bone Length (In/Out or Backward/Forward)
 * *   **17**: Chin Bone Shape (Pointed/Square)
 * *   **18**: Chin Hole (Chin Bum)
 * *   **19**: Neck Thickness (Thin/Thick)
 * **Note:**
 * You may need to call [`SetPedHeadBlendData`](#0x9414E18B9434C2FE) prior to calling this native in order for it to work.
 * 
 * **This is the server-side RPC native equivalent of the client native [\_SET_PED_FACE_FEATURE](?\_0x71A5C1DBA060049E).**
 * @param ped
 * @param index
 * @param scale
 */
export function SetPedFaceFeature(ped: number, index: number, scale: number): void {
	return _in(0x00000000, 0x6c8d4458, ped, index, scale); 
}

/**
 * p1, p2, p3 are RGB values for color (255,0,0 for Red, ect)
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_VEHICLE_CUSTOM_PRIMARY_COLOUR](?\_0x7141766F91D15BEA).**
 * @param vehicle
 * @param r
 * @param g
 * @param b
 */
export function setVehicleCustomPrimaryColour(vehicle: number, r: number, g: number, b: number): void {
	return _in(0x00000000, 0x8df9f9bc, vehicle, r, g, b); 
}

/**
 * Makes the specified ped attack the target ped.
 * p2 should be 0
 * p3 should be 16
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_COMBAT_PED](?\_0xF166E48407BAC484).**
 * @param ped
 * @param targetPed
 * @param p2
 * @param p3
 */
export function taskCombatPed(ped: number, targetPed: number, p2: number, p3: number): void {
	return _in(0x00000000, 0xcb0d8932, ped, targetPed, p2, p3); 
}

/**
 * The entity will move towards the target until time is over (duration) or get in target's range (distance). p5 and p6 are unknown, but you could leave p5 = 1073741824 or 100 or even 0 (didn't see any difference but on the decompiled scripts, they use 1073741824 mostly) and p6 = 0
 * Note: I've only tested it on entity -> ped and target -> vehicle. It could work differently on other entities, didn't try it yet.
 * Example: TASK::TASK_GO_TO_ENTITY(pedHandle, vehicleHandle, 5000, 4.0, 100, 1073741824, 0)
 * Ped will run towards the vehicle for 5 seconds and stop when time is over or when he gets 4 meters(?) around the vehicle (with duration = -1, the task duration will be ignored).
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_GO_TO_ENTITY](?\_0x6A071245EB0D1882).**
 * @param entity
 * @param target
 * @param duration
 * @param distance
 * @param speed
 * @param p5
 * @param p6
 */
export function taskGoToEntity(entity: number, target: number, duration: number, distance: number, speed: number, p5: number, p6: number): void {
	return _in(0x00000000, 0x374827c2, entity, target, duration, distance, speed, p5, p6); 
}

/**
 * In the scripts, p3 was always -1.
 * p3 seems to be duration or timeout of turn animation.
 * Also facingPed can be 0 or -1 so ped will just raise hands up.
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_HANDS_UP](?\_0xF2EAB31979A7F910).**
 * @param ped
 * @param duration
 * @param facingPed
 * @param p3
 * @param p4
 */
export function taskHandsUp(ped: number, duration: number, facingPed: number, p3: number, p4: boolean): void {
	return _in(0x00000000, 0x8dcc19c5, ped, duration, facingPed, p3, p4); 
}

/**
 * **This is the server-side RPC native equivalent of the client native [TASK_REACT_AND_FLEE_PED](?\_0x72C896464915D1B1).**
 * @param ped
 * @param fleeTarget
 */
export function taskReactAndFleePed(ped: number, fleeTarget: number): void {
	return _in(0x00000000, 0x8a632bd8, ped, fleeTarget); 
}

/**
 * cpp
 * // Potential names and hash collisions included as comments
 * enum ePedConfigFlags {
 * \_0x67D1A445 = 0,
 * \_0xC63DE95E = 1,
 * CPED_CONFIG_FLAG_NoCriticalHits = 2,
 * CPED_CONFIG_FLAG_DrownsInWater = 3,
 * CPED_CONFIG_FLAG_DisableReticuleFixedLockon = 4,
 * \_0x37D196F4 = 5,
 * \_0xE2462399 = 6,
 * CPED_CONFIG_FLAG_UpperBodyDamageAnimsOnly = 7,
 * \_0xEDDEB838 = 8,
 * \_0xB398B6FD = 9,
 * \_0xF6664E68 = 10,
 * \_0xA05E7CA3 = 11,
 * \_0xCE394045 = 12,
 * CPED_CONFIG_FLAG_NeverLeavesGroup = 13,
 * \_0xCD8D1411 = 14,
 * \_0xB031F1A9 = 15,
 * \_0xFE65BEE3 = 16,
 * CPED_CONFIG_FLAG_BlockNonTemporaryEvents = 17,
 * \_0x380165BD = 18,
 * \_0x07C045C7 = 19,
 * \_0x583B5E2D = 20,
 * \_0x475EDA58 = 21,
 * \_0x8629D05B = 22,
 * \_0x1522968B = 23,
 * CPED_CONFIG_FLAG_IgnoreSeenMelee = 24,
 * \_0x4CC09C4B = 25,
 * \_0x034F3053 = 26,
 * \_0xD91BA7CC = 27,
 * \_0x5C8DC66E = 28,
 * \_0x8902EAA0 = 29,
 * \_0x6580B9D2 = 30,
 * \_0x0EF7A297 = 31,
 * \_0x6BF86E5B = 32,
 * CPED_CONFIG_FLAG_DieWhenRagdoll = 33,
 * CPED_CONFIG_FLAG_HasHelmet = 34,
 * CPED_CONFIG_FLAG_UseHelmet = 35,
 * \_0xEEB3D630 = 36,
 * \_0xB130D17B = 37,
 * \_0x5F071200 = 38,
 * CPED_CONFIG_FLAG_DisableEvasiveDives = 39,
 * \_0xC287AAFF = 40,
 * \_0x203328CC = 41,
 * CPED_CONFIG_FLAG_DontInfluenceWantedLevel = 42,
 * CPED_CONFIG_FLAG_DisablePlayerLockon = 43,
 * CPED_CONFIG_FLAG_DisableLockonToRandomPeds = 44,
 * \_0xEC4A8ACF = 45,
 * \_0xDB115BFA = 46,
 * CPED_CONFIG_FLAG_PedBeingDeleted = 47,
 * CPED_CONFIG_FLAG_BlockWeaponSwitching = 48,
 * \_0xF8E99565 = 49,
 * \_0xDD17FEE6 = 50,
 * \_0x7ED9B2C9 = 51,
 * \_0x655E8618 = 52,
 * \_0x5A6C1F6E = 53,
 * \_0xD749FC41 = 54,
 * \_0x357F63F3 = 55,
 * \_0xC5E60961 = 56,
 * \_0x29275C3E = 57,
 * CPED_CONFIG_FLAG_IsFiring = 58,
 * CPED_CONFIG_FLAG_WasFiring = 59,
 * CPED_CONFIG_FLAG_IsStanding = 60,
 * CPED_CONFIG_FLAG_WasStanding = 61,
 * CPED_CONFIG_FLAG_InVehicle = 62,
 * CPED_CONFIG_FLAG_OnMount = 63,
 * CPED_CONFIG_FLAG_AttachedToVehicle = 64,
 * CPED_CONFIG_FLAG_IsSwimming = 65,
 * CPED_CONFIG_FLAG_WasSwimming = 66,
 * CPED_CONFIG_FLAG_IsSkiing = 67,
 * CPED_CONFIG_FLAG_IsSitting = 68,
 * CPED_CONFIG_FLAG_KilledByStealth = 69,
 * CPED_CONFIG_FLAG_KilledByTakedown = 70,
 * CPED_CONFIG_FLAG_Knockedout = 71,
 * \_0x3E3C4560 = 72,
 * \_0x2994C7B7 = 73,
 * \_0x6D59D275 = 74,
 * CPED_CONFIG_FLAG_UsingCoverPoint = 75,
 * CPED_CONFIG_FLAG_IsInTheAir = 76,
 * \_0x2D493FB7 = 77,
 * CPED_CONFIG_FLAG_IsAimingGun = 78,
 * \_0x14D69875 = 79,
 * \_0x40B05311 = 80,
 * \_0x8B230BC5 = 81,
 * \_0xC74E5842 = 82,
 * \_0x9EA86147 = 83,
 * \_0x674C746C = 84,
 * \_0x3E56A8C2 = 85,
 * \_0xC144A1EF = 86,
 * \_0x0548512D = 87,
 * \_0x31C93909 = 88,
 * \_0xA0269315 = 89,
 * \_0xD4D59D4D = 90,
 * \_0x411D4420 = 91,
 * \_0xDF4AEF0D = 92,
 * CPED_CONFIG_FLAG_ForcePedLoadCover = 93,
 * \_0x300E4CD3 = 94,
 * \_0xF1C5BF04 = 95,
 * \_0x89C2EF13 = 96,
 * CPED_CONFIG_FLAG_VaultFromCover = 97,
 * \_0x02A852C8 = 98,
 * \_0x3D9407F1 = 99,
 * \_0x319B4558 = 100,
 * CPED_CONFIG_FLAG_ForcedAim = 101,
 * \_0xB942D71A = 102,
 * \_0xD26C55A8 = 103,
 * \_0xB89E703B = 104,
 * CPED_CONFIG_FLAG_ForceReload = 105,
 * \_0xD9E73DA2 = 106,
 * \_0xFF71DC2C = 107,
 * \_0x1E27E8D8 = 108,
 * \_0xF2C53966 = 109,
 * \_0xC4DBE247 = 110,
 * \_0x83C0A4BF = 111,
 * \_0x0E0FAF8C = 112,
 * \_0x26616660 = 113,
 * \_0x43B80B79 = 114,
 * \_0x0D2A9309 = 115,
 * \_0x12C1C983 = 116,
 * CPED_CONFIG_FLAG_BumpedByPlayer = 117,
 * \_0xE586D504 = 118,
 * \_0x52374204 = 119,
 * CPED_CONFIG_FLAG_IsHandCuffed = 120,
 * CPED_CONFIG_FLAG_IsAnkleCuffed = 121,
 * CPED_CONFIG_FLAG_DisableMelee = 122,
 * \_0xFE714397 = 123,
 * \_0xB3E660BD = 124,
 * \_0x5FED6BFD = 125,
 * \_0xC9D6F66F = 126,
 * \_0x519BC986 = 127,
 * CPED_CONFIG_FLAG_CanBeAgitated = 128,
 * \_0x9A4B617C = 129, // CPED_CONFIG_FLAG_FaceDirInsult
 * \_0xDAB70E9F = 130,
 * \_0xE569438A = 131,
 * \_0xBBC77D6D = 132,
 * \_0xCB59EF0F = 133,
 * \_0x8C5EA971 = 134,
 * CPED_CONFIG_FLAG_IsScuba = 135,
 * CPED_CONFIG_FLAG_WillArrestRatherThanJack = 136,
 * \_0xDCE59B58 = 137,
 * CPED_CONFIG_FLAG_RidingTrain = 138,
 * CPED_CONFIG_FLAG_ArrestResult = 139,
 * CPED_CONFIG_FLAG_CanAttackFriendly = 140,
 * \_0x98A4BE43 = 141,
 * \_0x6901E731 = 142,
 * \_0x9EC9BF6C = 143,
 * \_0x42841A8F = 144,
 * CPED_CONFIG_FLAG_ShootingAnimFlag = 145,
 * CPED_CONFIG_FLAG_DisableLadderClimbing = 146,
 * CPED_CONFIG_FLAG_StairsDetected = 147,
 * CPED_CONFIG_FLAG_SlopeDetected = 148,
 * \_0x1A15670B = 149,
 * \_0x61786EE5 = 150,
 * \_0xCB9186BD = 151,
 * \_0xF0710152 = 152,
 * \_0x43DFE310 = 153,
 * \_0xC43C624E = 154,
 * CPED_CONFIG_FLAG_CanPerformArrest = 155,
 * CPED_CONFIG_FLAG_CanPerformUncuff = 156,
 * CPED_CONFIG_FLAG_CanBeArrested = 157,
 * \_0xF7960FF5 = 158,
 * \_0x59564113 = 159,
 * \_0x0C6C3099 = 160,
 * \_0x645F927A = 161,
 * \_0xA86549B9 = 162,
 * \_0x8AAF337A = 163,
 * \_0x13BAA6E7 = 164,
 * \_0x5FB9D1F5 = 165,
 * CPED_CONFIG_FLAG_IsInjured = 166,
 * \_0x6398A20B = 167,
 * \_0xD8072639 = 168,
 * \_0xA05B1845 = 169,
 * \_0x83F6D220 = 170,
 * \_0xD8430331 = 171,
 * \_0x4B547520 = 172,
 * \_0xE66E1406 = 173,
 * \_0x1C4BFE0C = 174,
 * \_0x90008BFA = 175,
 * \_0x07C7A910 = 176,
 * \_0xF15F8191 = 177,
 * \_0xCE4E8BE2 = 178,
 * \_0x1D46E4F2 = 179,
 * CPED_CONFIG_FLAG_IsInCustody = 180,
 * \_0xE4FD9B3A = 181,
 * \_0x67AE0812 = 182,
 * CPED_CONFIG_FLAG_IsAgitated = 183,
 * CPED_CONFIG_FLAG_PreventAutoShuffleToDriversSeat = 184,
 * \_0x7B2D325E = 185,
 * CPED_CONFIG_FLAG_EnableWeaponBlocking = 186,
 * CPED_CONFIG_FLAG_HasHurtStarted = 187,
 * CPED_CONFIG_FLAG_DisableHurt = 188,
 * CPED_CONFIG_FLAG_PlayerIsWeird = 189,
 * \_0x32FC208B = 190,
 * \_0x0C296E5A = 191,
 * \_0xE63B73EC = 192,
 * \_0x04E9CC80 = 193,
 * CPED_CONFIG_FLAG_UsingScenario = 194,
 * CPED_CONFIG_FLAG_VisibleOnScreen = 195,
 * \_0xD88C58A1 = 196,
 * \_0x5A3DCF43 = 197, // CPED_CONFIG_FLAG_AvoidUnderSide
 * \_0xEA02B420 = 198,
 * \_0x3F559CFF = 199,
 * \_0x8C55D029 = 200,
 * \_0x5E6466F6 = 201,
 * \_0xEB5AD706 = 202,
 * \_0x0EDDDDE7 = 203,
 * \_0xA64F7B1D = 204,
 * \_0x48532CBA = 205,
 * \_0xAA25A9E7 = 206,
 * \_0x415B26B9 = 207,
 * CPED_CONFIG_FLAG_DisableExplosionReactions = 208,
 * CPED_CONFIG_FLAG_DodgedPlayer = 209,
 * \_0x67405504 = 210,
 * \_0x75DDD68C = 211,
 * \_0x2AD879B4 = 212,
 * \_0x51486F91 = 213,
 * \_0x32F79E21 = 214,
 * \_0xBF099213 = 215,
 * \_0x054AC8E2 = 216,
 * \_0x14E495CC = 217,
 * \_0x3C7DF9DF = 218,
 * \_0x848FFEF2 = 219,
 * CPED_CONFIG_FLAG_DontEnterLeadersVehicle = 220,
 * \_0x2618E1CF = 221,
 * \_0x84F722FA = 222,
 * \_0xD1B87B1F = 223,
 * \_0x728AA918 = 224,
 * CPED_CONFIG_FLAG_DisablePotentialToBeWalkedIntoResponse = 225,
 * CPED_CONFIG_FLAG_DisablePedAvoidance = 226,
 * \_0x59E91185 = 227,
 * \_0x1EA7225F = 228,
 * CPED_CONFIG_FLAG_DisablePanicInVehicle = 229,
 * \_0x6DCA7D88 = 230,
 * \_0xFC3E572D = 231,
 * \_0x08E9F9CF = 232,
 * \_0x2D3BA52D = 233,
 * \_0xFD2F53EA = 234,
 * \_0x31A1B03B = 235,
 * CPED_CONFIG_FLAG_IsHoldingProp = 236,
 * \_0x82ED0A66 = 237, // CPED_CONFIG_FLAG_BlocksPathingWhenDead
 * \_0xCE57C9A3 = 238,
 * \_0x26149198 = 239,
 * \_0x1B33B598 = 240,
 * \_0x719B6E87 = 241,
 * \_0x13E8E8E8 = 242,
 * \_0xF29739AE = 243,
 * \_0xABEA8A74 = 244,
 * \_0xB60EA2BA = 245,
 * \_0x536B0950 = 246,
 * \_0x0C754ACA = 247,
 * CPED_CONFIG_FLAG_DisableVehicleSeatRandomAnimations = 248,
 * \_0x12659168 = 249,
 * \_0x1BDF2F04 = 250,
 * \_0x7728FAA3 = 251,
 * \_0x6A807ED8 = 252,
 * CPED_CONFIG_FLAG_OnStairs = 253,
 * \_0xE1A2F73F = 254,
 * \_0x5B3697C8 = 255,
 * \_0xF1EB20A9 = 256,
 * \_0x8B7DF407 = 257,
 * \_0x329DCF1A = 258,
 * \_0x8D90DD1B = 259,
 * \_0xB8A292B7 = 260,
 * \_0x8374B087 = 261,
 * \_0x2AF558F0 = 262,
 * \_0x82251455 = 263,
 * \_0x30CF498B = 264,
 * \_0xE1CD50AF = 265,
 * \_0x72E4AE48 = 266,
 * \_0xC2657EA1 = 267,
 * \_0x29FF6030 = 268,
 * \_0x8248A5EC = 269,
 * CPED_CONFIG_FLAG_OnStairSlope = 270,
 * \_0xA0897933 = 271,
 * CPED_CONFIG_FLAG_DontBlipCop = 272,
 * CPED_CONFIG_FLAG_ClimbedShiftedFence = 273,
 * \_0xF7823618 = 274,
 * \_0xDC305CCE = 275, // CPED_CONFIG_FLAG_KillWhenTrapped
 * CPED_CONFIG_FLAG_EdgeDetected = 276,
 * \_0x92B67896 = 277,
 * \_0xCAD677C9 = 278,
 * CPED_CONFIG_FLAG_AvoidTearGas = 279,
 * \_0x5276AC7B = 280,
 * \_0x1032692A = 281,
 * \_0xDA23E7F1 = 282,
 * \_0x9139724D = 283,
 * \_0xA1457461 = 284,
 * \_0x4186E095 = 285,
 * \_0xAC68E2EB = 286,
 * CPED_CONFIG_FLAG_RagdollingOnBoat = 287,
 * CPED_CONFIG_FLAG_HasBrandishedWeapon = 288,
 * \_0x1B9EE8A1 = 289,
 * \_0xF3F5758C = 290,
 * \_0x2A9307F1 = 291,
 * \_0x7403D216 = 292,
 * \_0xA06A3C6C = 293,
 * CPED_CONFIG_FLAG_DisableShockingEvents = 294,
 * \_0xF8DA25A5 = 295,
 * \_0x7EF55802 = 296,
 * \_0xB31F1187 = 297,
 * \_0x84315402 = 298,
 * \_0x0FD69867 = 299,
 * \_0xC7829B67 = 300,
 * CPED_CONFIG_FLAG_DisablePedConstraints = 301,
 * \_0x6D23CF25 = 302,
 * \_0x2ADA871B = 303,
 * \_0x47BC8A58 = 304,
 * \_0xEB692FA5 = 305,
 * \_0x4A133C50 = 306,
 * \_0xC58099C3 = 307,
 * \_0xF3D76D41 = 308,
 * \_0xB0EEE9F2 = 309,
 * CPED_CONFIG_FLAG_IsInCluster = 310,
 * \_0x0FA153EF = 311,
 * \_0xD73F5CD3 = 312,
 * \_0xD4136C22 = 313,
 * \_0xE404CA6B = 314,
 * \_0xB9597446 = 315,
 * \_0xD5C98277 = 316,
 * \_0xD5060A9C = 317,
 * \_0x3E5F1CBB = 318,
 * \_0xD8BE1D54 = 319,
 * \_0x0B1F191F = 320,
 * \_0xC995167A = 321,
 * CPED_CONFIG_FLAG_HasHighHeels = 322,
 * \_0x86B01E54 = 323,
 * \_0x3A56FE15 = 324,
 * \_0xC03B736C = 325, // CPED_CONFIG_FLAG_SpawnedAtScenario
 * \_0xBBF47729 = 326,
 * \_0x22B668A8 = 327,
 * \_0x2624D4D4 = 328,
 * CPED_CONFIG_FLAG_DisableTalkTo = 329,
 * CPED_CONFIG_FLAG_DontBlip = 330,
 * CPED_CONFIG_FLAG_IsSwitchingWeapon = 331,
 * \_0x630F55F3 = 332,
 * \_0x150468FD = 333,
 * \_0x914EBD6B = 334,
 * \_0x79AF3B6D = 335,
 * \_0x75C7A632 = 336,
 * \_0x52D530E2 = 337,
 * \_0xDB2A90E0 = 338,
 * \_0x5922763D = 339,
 * \_0x12ADB567 = 340,
 * \_0x105C8518 = 341,
 * \_0x106F703D = 342,
 * \_0xED152C3E = 343,
 * \_0xA0EFE6A8 = 344,
 * \_0xBF348C82 = 345,
 * \_0xCDDFE830 = 346,
 * \_0x7B59BD9B = 347,
 * \_0x0124C788 = 348,
 * CPED_CONFIG_FLAG_EquipJetpack = 349,
 * \_0x08D361A5 = 350,
 * \_0xE13D1F7C = 351,
 * \_0x40E25FB9 = 352,
 * \_0x930629D9 = 353,
 * \_0xECCF0C7F = 354,
 * \_0xB6E9613B = 355,
 * \_0x490C0478 = 356,
 * \_0xE8865BEA = 357,
 * \_0xF3C34A29 = 358,
 * CPED_CONFIG_FLAG_IsDuckingInVehicle = 359,
 * \_0xF660E115 = 360,
 * \_0xAB0E6DED = 361,
 * CPED_CONFIG_FLAG_HasReserveParachute = 362,
 * CPED_CONFIG_FLAG_UseReserveParachute = 363,
 * \_0x5C5D9CD3 = 364,
 * \_0x8F7701F3 = 365,
 * \_0xBC4436AD = 366,
 * \_0xD7E07D37 = 367,
 * \_0x03C4FD24 = 368,
 * \_0x7675789A = 369,
 * \_0xB7288A88 = 370,
 * \_0xC06B6291 = 371,
 * \_0x95A4A805 = 372,
 * \_0xA8E9A042 = 373,
 * CPED_CONFIG_FLAG_NeverLeaveTrain = 374,
 * \_0xBAC674B3 = 375,
 * \_0x147F1FFB = 376,
 * \_0x4376DD79 = 377,
 * \_0xCD3DB518 = 378,
 * \_0xFE4BA4B6 = 379,
 * \_0x5DF03A55 = 380,
 * \_0xBCD816CD = 381,
 * \_0xCF02DD69 = 382,
 * \_0xF73AFA2E = 383,
 * \_0x80B9A9D0 = 384,
 * \_0xF601F7EE = 385,
 * \_0xA91350FC = 386,
 * \_0x3AB23B96 = 387,
 * CPED_CONFIG_FLAG_IsClimbingLadder = 388,
 * CPED_CONFIG_FLAG_HasBareFeet = 389,
 * \_0xB4B1CD4C = 390,
 * \_0x5459AFB8 = 391,
 * \_0x54F27667 = 392,
 * \_0xC11D3E8F = 393,
 * \_0x5419EB3E = 394,
 * \_0x82D8DBB4 = 395,
 * \_0x33B02D2F = 396,
 * \_0xAE66176D = 397,
 * \_0xA2692593 = 398,
 * \_0x714C7E31 = 399,
 * \_0xEC488AC7 = 400,
 * \_0xAE398504 = 401,
 * \_0xABC58D72 = 402,
 * \_0x5E5B9591 = 403,
 * \_0x6BA1091E = 404,
 * \_0x77840177 = 405,
 * \_0x1C7ACAC4 = 406,
 * \_0x124420E9 = 407,
 * \_0x75A65587 = 408,
 * \_0xDFD2D55B = 409,
 * \_0xBDD39919 = 410,
 * \_0x43DEC267 = 411,
 * \_0xE42B7797 = 412,
 * CPED_CONFIG_FLAG_IsHolsteringWeapon = 413,
 * \_0x4F8149F5 = 414,
 * \_0xDD9ECA7A = 415,
 * \_0x9E7EF9D2 = 416,
 * \_0x2C6ED942 = 417,
 * CPED_CONFIG_FLAG_IsSwitchingHelmetVisor = 418,
 * \_0xA488727D = 419,
 * \_0xCFF5F6DE = 420,
 * \_0x6D614599 = 421,
 * CPED_CONFIG_FLAG_DisableVehicleCombat = 422,
 * \_0xFE401D26 = 423,
 * CPED_CONFIG_FLAG_FallsLikeAircraft = 424,
 * \_0x2B42AE82 = 425,
 * \_0x7A95734F = 426,
 * \_0xDF4D8617 = 427,
 * \_0x578F1F14 = 428,
 * CPED_CONFIG_FLAG_DisableStartEngine = 429,
 * CPED_CONFIG_FLAG_IgnoreBeingOnFire = 430,
 * \_0x153C9500 = 431,
 * \_0xCB7A632E = 432,
 * \_0xDE727981 = 433,
 * CPED_CONFIG_FLAG_DisableHomingMissileLockon = 434,
 * \_0x12BBB935 = 435,
 * \_0xAD0A1277 = 436,
 * \_0xEA6AA46A = 437,
 * CPED_CONFIG_FLAG_DisableHelmetArmor = 438,
 * \_0xCB7F3A1E = 439,
 * \_0x50178878 = 440,
 * \_0x051B4F0D = 441,
 * \_0x2FC3DECC = 442,
 * \_0xC0030B0B = 443,
 * \_0xBBDAF1E9 = 444,
 * \_0x944FE59C = 445,
 * \_0x506FBA39 = 446,
 * \_0xDD45FE84 = 447,
 * \_0xE698AE75 = 448,
 * \_0x199633F8 = 449,
 * CPED_CONFIG_FLAG_PedIsArresting = 450,
 * CPED_CONFIG_FLAG_IsDecoyPed = 451,
 * \_0x3A251D83 = 452,
 * \_0xA56F6986 = 453,
 * \_0x1D19C622 = 454,
 * \_0xB68D3EAB = 455,
 * CPED_CONFIG_FLAG_CanBeIncapacitated = 456,
 * \_0x4BD5EBAD = 457,
 * }
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PED_CONFIG_FLAG](?\_0x1913FE4CBF41C463).**
 * @param ped
 * @param flagId
 * @param value
 */
export function setPedConfigFlag(ped: number, flagId: number, value: boolean): void {
	return _in(0x00000000, 0x9cfbe10d, ped, flagId, value); 
}

/**
 * Call SET_PLAYER_WANTED_LEVEL_NOW for immediate effect
 * wantedLevel is an integer value representing 0 to 5 stars even though the game supports the 6th wanted level but no police will appear since no definitions are present for it in the game files
 * disableNoMission-  Disables When Off Mission- appears to always be false
 * 
 * **This is the server-side RPC native equivalent of the client native [SET_PLAYER_WANTED_LEVEL](?\_0x39FF19C64EF7DA5B).**
 * @param player
 * @param wantedLevel
 * @param disableNoMission
 */
export function setPlayerWantedLevel(player: number, wantedLevel: number, disableNoMission: boolean): void {
	return _in(0x00000000, 0xb7a0914b, player, wantedLevel, disableNoMission); 
}

/**
 * //this part of the code is to determine at which entity the player is aiming, for example if you want to create a mod where you give orders to peds
 * Entity aimedentity;
 * Player player = PLAYER::PLAYER_ID();
 * PLAYER::\_GET_AIMED_ENTITY(player, \&aimedentity);
 * //bg is an array of peds
 * TASK::TASK_SHOOT_AT_ENTITY(bg\[i], aimedentity, 5000, MISC::GET_HASH_KEY("FIRING_PATTERN_FULL_AUTO"));
 * in practical usage, getting the entity the player is aiming at and then task the peds to shoot at the entity, at a button press event would be better.
 * Firing Pattern Hash Information: https://pastebin.com/Px036isB
 * 
 * **This is the server-side RPC native equivalent of the client native [TASK_SHOOT_AT_ENTITY](?\_0x08DA95E8298AE772).**
 * @param entity
 * @param target
 * @param duration
 * @param firingPattern
 */
export function taskShootAtEntity(entity: number, target: number, duration: number, firingPattern: number): void {
	return _in(0x00000000, 0xac0631c9, entity, target, duration, firingPattern); 
}
