module Realm exposing (updateState)

type alias SendPort msg model = model -> Cmd msg

batchStateCmds : SendPort msg model -> (model, Cmd msg) -> (model, Cmd msg)
batchStateCmds sendPort nextStateAndCmd =
    case nextStateAndCmd of
        (model, cmd) ->
            model ! [cmd, sendPort model]

updateState : (msg -> model -> (model, Cmd msg)) -> SendPort msg model -> msg -> model -> (model, Cmd msg)
updateState update sendPort = curry <| (uncurry update) >> batchStateCmds sendPort
