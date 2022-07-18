<?php 

// header('Content-Type: application/json; charset=UTF-8');

//
$dataResponse = array();
$dataResponse['status'] = 0;
$dataResponse['message'] = 'uploaded!';
$errors = array();

include 'WideImage/WideImage.php';

// ========================================================
// NEW VAR
$totalFiles = $_POST['total'];
$fileName = 'upload/';

$filesUpload = array(
    $_FILES['userFile1'],
    $_FILES['userFile2'],
    $_FILES['userFile3'],
    $_FILES['userFile4'],
    $_FILES['userFile5'],
    $_FILES['userFile6'],
    $_FILES['userFile7'],
    $_FILES['userFile8'],
    $_FILES['userFile9'],
    $_FILES['userFile10']
);


for($i = 0 ; $i < $totalFiles ; $i++) {

    // //PREVIEW 1 FOTOS
    if (!empty($filesUpload[$i]["name"])) {
        

        if($filesUpload[$i]['type'] !== 'image/jpeg' && $filesUpload[$i]['type'] !== 'image/jpg' && $filesUpload[$i]['type'] !== 'image/png'){
            $dataResponse["message"] = "Formato errado...".$filesUpload[$i]['type'];  
        } else {
            $image = WideImage::load($filesUpload[$i]["tmp_name"]);
            $fotoAtualWidth = $image->getWidth();
            $fotoAtualHeight = $image->getHeight();
            if($fotoAtualWidth >= $fotoAtualHeight) {
                $image = $image->resize(null,800); // largura maior
            } else {
                $image = $image->resize(800,null); // altura maior
            }                        
            $image = $image->crop('center', 'center', 800, 800);
            $image = $image->resize(800,800); // altura maior

            $image->saveToFile($fileName.$filesUpload[$i]["name"]);
            $dataResponse["message"] = "Upload Realizado!".$filesUpload[$i]['type']; 
            $dataResponse['status'] = 1;
        }

    } else {
        $dataResponse["message"] = "Campo File vazioz...";
    }
}


    $dataResponse["debug"] = $_FILES['userFile1'];



$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;
